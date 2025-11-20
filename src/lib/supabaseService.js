import { supabase } from './supabase';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
  const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return !!(url && key && url !== 'https://placeholder.supabase.co');
};

// Game Session Operations
export const gameSessionService = {
  // Save a game session (database first)
  async saveSession(sessionData) {
    if (!isSupabaseConfigured()) {
      // Fallback to localStorage if Supabase not configured
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
        return { id: 'local', ...sessionData };
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw error;
      }
    }
    
    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          player_count: sessionData.playerCount,
          players: sessionData.players,
          history: sessionData.history,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      
      // Also save to localStorage as backup
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
      } catch (localError) {
        console.warn('Failed to backup to localStorage:', localError);
      }
      
      return data;
    } catch (error) {
      console.error('Error saving game session:', error);
      // Fallback to localStorage
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
        return { id: 'local', ...sessionData };
      } catch (localError) {
        throw error; // Throw original error if localStorage also fails
      }
    }
  },

  // Update an existing game session (database first)
  async updateSession(sessionId, sessionData) {
    if (!isSupabaseConfigured() || sessionId === 'local') {
      // Fallback to localStorage if Supabase not configured or using local session
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
        return { id: 'local', ...sessionData };
      } catch (error) {
        console.error('Error updating localStorage:', error);
        throw error;
      }
    }
    
    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .update({
          player_count: sessionData.playerCount,
          players: sessionData.players,
          history: sessionData.history,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      
      // Also save to localStorage as backup
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
      } catch (localError) {
        console.warn('Failed to backup to localStorage:', localError);
      }
      
      return data;
    } catch (error) {
      console.error('Error updating game session:', error);
      // Fallback to localStorage
      try {
        localStorage.setItem('gameSession', JSON.stringify({
          ...sessionData,
          history: sessionData.history.map(h => ({
            ...h,
            timestamp: h.timestamp
          }))
        }));
        return { id: 'local', ...sessionData };
      } catch (localError) {
        throw error; // Throw original error if localStorage also fails
      }
    }
  },

  // Get the latest game session (database first, then localStorage)
  async getLatestSession() {
    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('game_sessions')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
        if (data) {
          // Sync to localStorage as backup
          try {
            localStorage.setItem('gameSession', JSON.stringify({
              playerCount: data.player_count,
              players: data.players,
              history: data.history
            }));
          } catch (localError) {
            console.warn('Failed to backup to localStorage:', localError);
          }
          return data;
        }
      } catch (error) {
        console.warn('Error fetching from database, trying localStorage:', error);
      }
    }
    
    // Fallback to localStorage
    try {
      const saved = localStorage.getItem('gameSession');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          id: 'local',
          player_count: parsed.playerCount || 2,
          players: parsed.players || [],
          history: parsed.history || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    return null;
  },

  // Get all game sessions
  async getAllSessions() {
    if (!isSupabaseConfigured()) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching game sessions:', error);
      return [];
    }
  },

  // Delete a game session (database first)
  async deleteSession(sessionId) {
    if (isSupabaseConfigured() && sessionId !== 'local') {
      try {
        const { error } = await supabase
          .from('game_sessions')
          .delete()
          .eq('id', sessionId);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting from database:', error);
        throw error;
      }
    }
    
    // Always clear localStorage
    try {
      localStorage.removeItem('gameSession');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
    
    return true;
  },
  
  // Migrate localStorage data to database
  async migrateLocalStorageToDatabase() {
    if (!isSupabaseConfigured()) {
      return false;
    }
    
    try {
      const saved = localStorage.getItem('gameSession');
      if (saved) {
        const parsed = JSON.parse(saved);
        const sessionData = {
          playerCount: parsed.playerCount || 2,
          players: parsed.players || [],
          history: parsed.history || []
        };
        
        const session = await this.saveSession(sessionData);
        if (session && session.id !== 'local') {
          console.log('Successfully migrated localStorage data to database');
          return session.id;
        }
      }
    } catch (error) {
      console.error('Error migrating localStorage to database:', error);
    }
    
    return false;
  },
};

// Team Names Operations
export const teamNamesService = {
  // Get all custom team names (database first, then localStorage)
  async getCustomTeamNames() {
    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('custom_team_names')
          .select('name')
          .order('created_at', { ascending: true });

        if (error) throw error;
        const names = (data || []).map(item => item.name);
        
        // Sync to localStorage as backup
        if (names.length > 0) {
          try {
            localStorage.setItem('customTeamNames', JSON.stringify(names));
          } catch (localError) {
            console.warn('Failed to backup to localStorage:', localError);
          }
        }
        
        return names;
      } catch (error) {
        console.warn('Error fetching from database, trying localStorage:', error);
      }
    }
    
    // Fallback to localStorage
    try {
      const saved = localStorage.getItem('customTeamNames');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(name => typeof name === 'string' && name.trim());
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    return [];
  },

  // Add a custom team name (database first)
  async addTeamName(name) {
    const trimmed = name.trim();
    if (!trimmed) return null;
    
    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('custom_team_names')
          .insert({ name: trimmed })
          .select()
          .single();

        if (error) throw error;
        
        // Also update localStorage
        try {
          const current = await this.getCustomTeamNames();
          localStorage.setItem('customTeamNames', JSON.stringify([...current, trimmed]));
        } catch (localError) {
          console.warn('Failed to update localStorage:', localError);
        }
        
        return data;
      } catch (error) {
        console.warn('Error adding to database, using localStorage:', error);
      }
    }
    
    // Fallback to localStorage
    try {
      const current = JSON.parse(localStorage.getItem('customTeamNames') || '[]');
      if (!current.includes(trimmed)) {
        current.push(trimmed);
        localStorage.setItem('customTeamNames', JSON.stringify(current));
      }
      return { name: trimmed };
    } catch (error) {
      console.error('Error adding team name:', error);
      throw error;
    }
  },

  // Remove a custom team name (database first)
  async removeTeamName(name) {
    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('custom_team_names')
          .delete()
          .eq('name', name);

        if (error) throw error;
      } catch (error) {
        console.warn('Error removing from database, using localStorage:', error);
      }
    }
    
    // Also update localStorage
    try {
      const current = JSON.parse(localStorage.getItem('customTeamNames') || '[]');
      const updated = current.filter(n => n !== name);
      localStorage.setItem('customTeamNames', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing team name:', error);
      throw error;
    }
    
    return true;
  },

  // Sync all custom team names (replace existing) - database first
  async syncTeamNames(names) {
    const trimmedNames = names.map(n => n.trim()).filter(Boolean);
    
    // Try database first if configured
    if (isSupabaseConfigured()) {
      try {
        // First, delete all existing names
        await supabase.from('custom_team_names').delete().neq('id', 0);

        // Then insert all new names
        if (trimmedNames.length > 0) {
          const { error } = await supabase
            .from('custom_team_names')
            .insert(trimmedNames.map(name => ({ name })));

          if (error) throw error;
        }
      } catch (error) {
        console.warn('Error syncing to database, using localStorage:', error);
      }
    }
    
    // Also update localStorage
    try {
      localStorage.setItem('customTeamNames', JSON.stringify(trimmedNames));
    } catch (error) {
      console.error('Error syncing team names:', error);
      throw error;
    }
    
    return true;
  },
  
  // Migrate localStorage data to database
  async migrateLocalStorageToDatabase() {
    if (!isSupabaseConfigured()) {
      return false;
    }
    
    try {
      const saved = localStorage.getItem('customTeamNames');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          await this.syncTeamNames(parsed);
          console.log('Successfully migrated team names from localStorage to database');
          return true;
        }
      }
    } catch (error) {
      console.error('Error migrating team names to database:', error);
    }
    
    return false;
  },
};

