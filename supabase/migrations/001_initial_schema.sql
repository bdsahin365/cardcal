-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_count INTEGER NOT NULL DEFAULT 2,
  players JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create custom_team_names table
CREATE TABLE IF NOT EXISTS custom_team_names (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on game_sessions updated_at for faster queries
CREATE INDEX IF NOT EXISTS idx_game_sessions_updated_at ON game_sessions(updated_at DESC);

-- Create index on custom_team_names name for faster lookups
CREATE INDEX IF NOT EXISTS idx_custom_team_names_name ON custom_team_names(name);

-- Enable Row Level Security (RLS) - optional, adjust based on your needs
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_team_names ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (adjust based on your security needs)
-- For public access (no authentication required):
CREATE POLICY "Allow public read access on game_sessions" ON game_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on game_sessions" ON game_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on game_sessions" ON game_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on game_sessions" ON game_sessions
  FOR DELETE USING (true);

CREATE POLICY "Allow public read access on custom_team_names" ON custom_team_names
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on custom_team_names" ON custom_team_names
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete on custom_team_names" ON custom_team_names
  FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_game_sessions_updated_at
  BEFORE UPDATE ON game_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

