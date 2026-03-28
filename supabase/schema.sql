-- QuestLog Database Schema for Supabase

-- Enum for Game Status
CREATE TYPE game_status AS ENUM ('backlog', 'playing', 'finished');

-- Table: user_games
CREATE TABLE public.user_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rawg_game_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT,
  status game_status DEFAULT 'backlog' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries by user (e.g. "Get my backlog")
CREATE INDEX idx_user_games_user_id ON public.user_games(user_id);

-- Unique constraint so a user can't add the exact same game twice
CREATE UNIQUE INDEX idx_user_games_unique_game ON public.user_games(user_id, rawg_game_id);

-- Enable Row Level Security
ALTER TABLE public.user_games ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own games"
  ON public.user_games FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own games"
  ON public.user_games FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own games"
  ON public.user_games FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own games"
  ON public.user_games FOR DELETE
  USING (auth.uid() = user_id);
