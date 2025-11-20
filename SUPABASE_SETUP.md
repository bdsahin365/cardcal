# Supabase Setup Guide

This guide will help you set up Supabase for the CardCal score tracking application.

## Prerequisites

- A Supabase account ([Sign up here](https://supabase.com))
- Basic knowledge of SQL and database management

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: CardCal (or any name you prefer)
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (usually 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need two values:
   - **Project URL**: Found under "Project URL"
   - **anon/public key**: Found under "Project API keys" → "anon public"

Copy these values - you'll need them in the next step.

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

**Important**: Never commit your `.env` file to version control! It should already be in `.gitignore`.

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute the SQL

This will create:
- `game_sessions` table: Stores game state and history
- `custom_team_names` table: Stores custom team names
- Required indexes and policies for public access

## Step 5: Verify Tables

1. Go to **Table Editor** in your Supabase dashboard
2. You should see two tables:
   - `game_sessions`
   - `custom_team_names`

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser
3. Make some score changes
4. Check your Supabase dashboard → **Table Editor** → `game_sessions` to see if data is being saved

## Features Enabled by Supabase

With Supabase integrated, your app now has:

✅ **Cloud Sync**: Game sessions sync across devices  
✅ **Team Names Sync**: Custom team names are stored in the cloud  
✅ **Data Persistence**: Game data persists even after clearing browser cache  
✅ **Offline Support**: Falls back to localStorage if Supabase is unavailable  
✅ **History Tracking**: Complete game history stored in the cloud  

## Security Considerations

The current setup uses **public read/write access** (no authentication). This is fine for:
- Personal projects
- Internal team use
- Development/testing

For production apps with multiple users, consider:
- Adding user authentication
- Implementing Row Level Security (RLS) policies
- Restricting access based on user IDs

## Troubleshooting

### "Supabase credentials not found" warning
- Check that your `.env` file exists and has the correct variable names
- Restart your development server after adding environment variables
- Ensure variables start with `VITE_` prefix

### Data not saving
- Check browser console for errors
- Verify your Supabase project is active
- Check that tables were created successfully
- Verify RLS policies allow public access (if you're not using auth)

### Connection errors
- Verify your Supabase URL and key are correct
- Check your internet connection
- Ensure your Supabase project is not paused (free tier projects pause after inactivity)

## Next Steps (Optional)

1. **Add User Authentication**: Enable user accounts for personalized game sessions
2. **Real-time Updates**: Use Supabase Realtime for live collaboration
3. **Analytics**: Track game statistics and player performance
4. **Backup & Restore**: Implement game session backup/restore functionality

## Support

For more information:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Project Issues](https://github.com/bdsahin365/cardcal/issues)

