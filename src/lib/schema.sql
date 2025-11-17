-- Create the game_rooms table
CREATE TABLE game_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
  is_storyteller BOOLEAN DEFAULT FALSE
);

-- Create a table for cards in player hands
CREATE TABLE player_hands (
  id BIGSERIAL PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL -- Assuming card IDs are strings from your data/cards.ts
);

-- Create the game_state table to hold the story log
CREATE TABLE game_state (
  id BIGSERIAL PRIMARY KEY,
  room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
  story_log JSONB[] DEFAULT '{}'::JSONB[]
);

-- Enable Realtime on the tables
ALTER PUBLICATION supabase_realtime ADD TABLE game_rooms, players, player_hands, game_state;
