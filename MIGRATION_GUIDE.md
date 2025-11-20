# Data Migration Guide

This guide explains how to migrate your existing localStorage data to the Supabase database.

## Automatic Migration

The app automatically attempts to migrate localStorage data to the database when:
- Supabase is properly configured
- The app loads and detects localStorage data
- No existing database data is found

This happens silently in the background and won't interrupt your usage.

## Manual Migration

If you want to manually trigger migration or check migration status, you can use the browser console.

### Step 1: Open Browser Console

1. Open your app in the browser
2. Press `F12` or `Right-click → Inspect`
3. Go to the **Console** tab

### Step 2: Check Available Data

First, check what data exists in localStorage:

```javascript
migrateToDatabase.checkLocalStorage()
```

This will show:
- Whether game session data exists
- Whether team names exist
- Summary of the data

### Step 3: Check Supabase Configuration

Verify that Supabase is configured:

```javascript
migrateToDatabase.isConfigured()
```

Should return `true` if Supabase credentials are set.

### Step 4: Run Migration

#### Migrate Everything

```javascript
migrateToDatabase.migrateAll()
```

This will:
- Migrate game session data
- Migrate team names
- Show detailed results

#### Migrate Specific Data

```javascript
// Migrate only game session
migrateToDatabase.migrateGameSession()

// Migrate only team names
migrateToDatabase.migrateTeamNames()
```

## Migration Functions

### `migrateAll()`

Migrates all localStorage data to the database.

**Returns:**
```javascript
{
  success: true/false,
  message: "Migration completed successfully",
  results: {
    gameSession: { success: true, sessionId: "..." },
    teamNames: { success: true, count: 5 }
  }
}
```

### `migrateGameSession()`

Migrates game session data (players, scores, history).

**Returns:**
```javascript
{
  success: true/false,
  sessionId: "uuid-or-null",
  message: "Game session migrated to database"
}
```

### `migrateTeamNames()`

Migrates custom team names.

**Returns:**
```javascript
{
  success: true/false,
  count: 5,
  message: "Migrated 5 team name(s) to database"
}
```

### `checkLocalStorage()`

Checks what data exists in localStorage.

**Returns:**
```javascript
{
  hasGameSession: true,
  hasTeamNames: true,
  gameSessionData: {
    playerCount: 2,
    playersCount: 2,
    historyCount: 10
  },
  teamNamesData: {
    count: 5,
    names: ["Name 1", "Name 2", ...]
  }
}
```

### `isConfigured()`

Checks if Supabase is configured.

**Returns:** `true` or `false`

## Example Migration Workflow

```javascript
// 1. Check what data you have
const data = migrateToDatabase.checkLocalStorage();
console.log('LocalStorage data:', data);

// 2. Verify Supabase is configured
if (migrateToDatabase.isConfigured()) {
  console.log('✅ Supabase is configured');
  
  // 3. Run migration
  const result = await migrateToDatabase.migrateAll();
  console.log('Migration result:', result);
  
  if (result.success) {
    console.log('✅ All data migrated successfully!');
  } else {
    console.warn('⚠️ Some data failed to migrate');
  }
} else {
  console.error('❌ Supabase not configured. Add credentials to .env file.');
}
```

## Troubleshooting

### "Supabase not configured"

**Solution:** Add your Supabase credentials to `.env` file:
```env
VITE_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Then restart your dev server.

### "No data found in localStorage"

**Solution:** This means there's no data to migrate. This is normal for new installations.

### "Failed to migrate"

**Possible causes:**
1. Database tables not created - Run the SQL migration in Supabase
2. Network issues - Check your internet connection
3. RLS policies - Verify your Supabase RLS policies allow public access

### Data Already Exists

If data already exists in the database:
- Game sessions: Will update the latest session
- Team names: Will only add new names (won't duplicate)

## Verification

After migration, verify data in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor**
3. Check `game_sessions` table for your game data
4. Check `custom_team_names` table for your team names

## Notes

- Migration is **safe** - it won't delete localStorage data
- Migration is **idempotent** - you can run it multiple times safely
- Existing database data takes precedence
- localStorage remains as a backup after migration

## Need Help?

If you encounter issues:
1. Check browser console for error messages
2. Verify Supabase credentials are correct
3. Ensure database tables are created
4. Check Supabase dashboard for any errors

