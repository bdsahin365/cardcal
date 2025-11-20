/**
 * Migration utility to move localStorage data to Supabase database
 * Can be run manually from browser console or automatically on app load
 */

import { gameSessionService, teamNamesService } from './supabaseService';

/**
 * Check if Supabase is configured
 */
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
  const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return !!(url && key && url !== 'https://placeholder.supabase.co');
};

/**
 * Migrate game session from localStorage to database
 */
export const migrateGameSession = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot migrate game session.');
    return { success: false, message: 'Supabase not configured' };
  }

  try {
    // Check if there's data in localStorage
    const saved = localStorage.getItem('gameSession');
    if (!saved) {
      return { success: false, message: 'No game session data found in localStorage' };
    }

    const parsed = JSON.parse(saved);
    const sessionData = {
      playerCount: parsed.playerCount || 2,
      players: parsed.players || [],
      history: parsed.history || []
    };

    // Check if we already have this data in database
    const existingSession = await gameSessionService.getLatestSession();
    if (existingSession && existingSession.id !== 'local') {
      // Update existing session
      const updated = await gameSessionService.updateSession(existingSession.id, sessionData);
      console.log('✅ Game session updated in database:', updated.id);
      return { success: true, sessionId: updated.id, message: 'Game session updated in database' };
    } else {
      // Create new session
      const newSession = await gameSessionService.saveSession(sessionData);
      if (newSession && newSession.id && newSession.id !== 'local') {
        console.log('✅ Game session migrated to database:', newSession.id);
        return { success: true, sessionId: newSession.id, message: 'Game session migrated to database' };
      }
    }

    return { success: false, message: 'Failed to migrate game session' };
  } catch (error) {
    console.error('❌ Error migrating game session:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

/**
 * Migrate team names from localStorage to database
 */
export const migrateTeamNames = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot migrate team names.');
    return { success: false, message: 'Supabase not configured' };
  }

  try {
    // Check if there's data in localStorage
    const saved = localStorage.getItem('customTeamNames');
    if (!saved) {
      return { success: false, message: 'No team names data found in localStorage' };
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { success: false, message: 'No team names to migrate' };
    }

    // Get existing team names from database
    const existingNames = await teamNamesService.getCustomTeamNames();
    
    // Merge: add names that don't exist in database
    const namesToAdd = parsed.filter(name => !existingNames.includes(name));
    
    if (namesToAdd.length > 0) {
      // Add new names
      for (const name of namesToAdd) {
        try {
          await teamNamesService.addTeamName(name);
        } catch (error) {
          console.warn(`Failed to add team name "${name}":`, error);
        }
      }
      console.log(`✅ Migrated ${namesToAdd.length} team name(s) to database`);
      return { 
        success: true, 
        count: namesToAdd.length, 
        message: `Migrated ${namesToAdd.length} team name(s) to database` 
      };
    } else {
      console.log('ℹ️ All team names already exist in database');
      return { success: true, count: 0, message: 'All team names already in database' };
    }
  } catch (error) {
    console.error('❌ Error migrating team names:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
};

/**
 * Migrate all data from localStorage to database
 */
export const migrateAllData = async () => {
  console.log('🚀 Starting migration of localStorage data to database...');
  
  if (!isSupabaseConfigured()) {
    console.error('❌ Supabase not configured. Please add your Supabase credentials to .env file.');
    return {
      success: false,
      message: 'Supabase not configured',
      results: {
        gameSession: { success: false, message: 'Supabase not configured' },
        teamNames: { success: false, message: 'Supabase not configured' }
      }
    };
  }

  const results = {
    gameSession: await migrateGameSession(),
    teamNames: await migrateTeamNames()
  };

  const allSuccess = results.gameSession.success && results.teamNames.success;
  
  if (allSuccess) {
    console.log('✅ Migration completed successfully!');
  } else {
    console.warn('⚠️ Migration completed with some errors. Check the logs above.');
  }

  return {
    success: allSuccess,
    message: allSuccess ? 'Migration completed successfully' : 'Migration completed with errors',
    results
  };
};

/**
 * Check what data exists in localStorage
 */
export const checkLocalStorageData = () => {
  const gameSession = localStorage.getItem('gameSession');
  const teamNames = localStorage.getItem('customTeamNames');

  const info = {
    hasGameSession: !!gameSession,
    hasTeamNames: !!teamNames,
    gameSessionData: null,
    teamNamesData: null
  };

  if (gameSession) {
    try {
      const parsed = JSON.parse(gameSession);
      info.gameSessionData = {
        playerCount: parsed.playerCount || 2,
        playersCount: parsed.players?.length || 0,
        historyCount: parsed.history?.length || 0
      };
    } catch (e) {
      info.gameSessionData = { error: 'Failed to parse' };
    }
  }

  if (teamNames) {
    try {
      const parsed = JSON.parse(teamNames);
      info.teamNamesData = {
        count: Array.isArray(parsed) ? parsed.length : 0,
        names: Array.isArray(parsed) ? parsed.slice(0, 5) : [] // First 5 names
      };
    } catch (e) {
      info.teamNamesData = { error: 'Failed to parse' };
    }
  }

  return info;
};

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  window.migrateToDatabase = {
    migrateAll: migrateAllData,
    migrateGameSession,
    migrateTeamNames,
    checkLocalStorage: checkLocalStorageData,
    isConfigured: isSupabaseConfigured
  };
  
  console.log('📦 Migration utilities loaded! Use window.migrateToDatabase to access:');
  console.log('  - migrateToDatabase.migrateAll() - Migrate all data');
  console.log('  - migrateToDatabase.migrateGameSession() - Migrate game session only');
  console.log('  - migrateToDatabase.migrateTeamNames() - Migrate team names only');
  console.log('  - migrateToDatabase.checkLocalStorage() - Check what data exists');
  console.log('  - migrateToDatabase.isConfigured() - Check if Supabase is configured');
}

