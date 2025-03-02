-- First, clean up any existing objects
-- Run the clean_functions.sql script first if needed

-- Create tables first
-- Blog tables
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID NOT NULL,
  category_id UUID REFERENCES blog_categories(id),
  status TEXT NOT NULL DEFAULT 'draft',
  views INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Music tables
CREATE TABLE IF NOT EXISTS music_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS music_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image TEXT,
  artist TEXT NOT NULL,
  release_date DATE,
  category_id UUID REFERENCES music_categories(id),
  status TEXT NOT NULL DEFAULT 'draft',
  views INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS music_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  album_id UUID REFERENCES music_albums(id) ON DELETE CASCADE,
  track_number INTEGER,
  duration INTEGER, -- in seconds
  audio_url TEXT NOT NULL,
  plays INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Video tables
CREATE TABLE IF NOT EXISTS video_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER, -- in seconds
  author_id UUID NOT NULL,
  category_id UUID REFERENCES video_categories(id),
  status TEXT NOT NULL DEFAULT 'draft',
  views INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS video_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos_tags (
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES video_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (video_id, tag_id)
);

-- Now create the functions

-- Drop functions if they exist before creating
DROP FUNCTION IF EXISTS increment_blog_views(UUID);
DROP FUNCTION IF EXISTS increment_music_album_views(UUID);
DROP FUNCTION IF EXISTS increment_music_track_plays(UUID);
DROP FUNCTION IF EXISTS increment_video_views(UUID);
DROP FUNCTION IF EXISTS create_blog_post_with_tags(JSONB, TEXT[]);
DROP FUNCTION IF EXISTS add_tags_to_blog_post(UUID, TEXT[]);
DROP FUNCTION IF EXISTS create_video_with_tags(JSONB, TEXT[]);
DROP FUNCTION IF EXISTS add_tags_to_video(UUID, TEXT[]);

-- Function to increment blog post views
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment music album views
CREATE OR REPLACE FUNCTION increment_music_album_views(album_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE music_albums
  SET views = views + 1
  WHERE id = album_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment music track plays
CREATE OR REPLACE FUNCTION increment_music_track_plays(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE music_tracks
  SET plays = plays + 1
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment video views
CREATE OR REPLACE FUNCTION increment_video_views(video_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE videos
  SET views = views + 1
  WHERE id = video_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a blog post with tags
CREATE OR REPLACE FUNCTION create_blog_post_with_tags(
  post_data JSONB,
  tag_names TEXT[]
)
RETURNS blog_posts AS $$
DECLARE
  new_post blog_posts;
  tag_id UUID;
  tag_name TEXT;
BEGIN
  -- Insert the blog post
  INSERT INTO blog_posts (
    title,
    slug,
    content,
    excerpt,
    featured_image,
    author_id,
    category_id,
    status,
    meta_title,
    meta_description,
    published_at
  )
  VALUES (
    post_data->>'title',
    post_data->>'slug',
    post_data->>'content',
    post_data->>'excerpt',
    post_data->>'featured_image',
    (post_data->>'author_id')::UUID,
    (post_data->>'category_id')::UUID,
    post_data->>'status',
    post_data->>'meta_title',
    post_data->>'meta_description',
    CASE
      WHEN post_data->>'published_at' IS NOT NULL THEN (post_data->>'published_at')::TIMESTAMP WITH TIME ZONE
      WHEN post_data->>'status' = 'published' THEN CURRENT_TIMESTAMP
      ELSE NULL
    END
  )
  RETURNING * INTO new_post;
  
  -- Add tags
  FOREACH tag_name IN ARRAY tag_names
  LOOP
    -- Check if tag exists, if not create it
    INSERT INTO blog_tags (name, slug)
    VALUES (
      tag_name,
      LOWER(REGEXP_REPLACE(REGEXP_REPLACE(tag_name, '[^\w\s-]', ''), '\s+', '-', 'g'))
    )
    ON CONFLICT (name) DO NOTHING;
    
    -- Get the tag ID
    SELECT id INTO tag_id FROM blog_tags WHERE name = tag_name;
    
    -- Link tag to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    VALUES (new_post.id, tag_id);
  END LOOP;
  
  RETURN new_post;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add tags to a blog post
CREATE OR REPLACE FUNCTION add_tags_to_blog_post(
  post_id UUID,
  tag_names TEXT[]
)
RETURNS void AS $$
DECLARE
  tag_id UUID;
  tag_name TEXT;
BEGIN
  FOREACH tag_name IN ARRAY tag_names
  LOOP
    -- Check if tag exists, if not create it
    INSERT INTO blog_tags (name, slug)
    VALUES (
      tag_name,
      LOWER(REGEXP_REPLACE(REGEXP_REPLACE(tag_name, '[^\w\s-]', ''), '\s+', '-', 'g'))
    )
    ON CONFLICT (name) DO NOTHING;
    
    -- Get the tag ID
    SELECT id INTO tag_id FROM blog_tags WHERE name = tag_name;
    
    -- Link tag to post
    INSERT INTO blog_posts_tags (post_id, tag_id)
    VALUES (post_id, tag_id)
    ON CONFLICT (post_id, tag_id) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a video with tags
CREATE OR REPLACE FUNCTION create_video_with_tags(
  video_data JSONB,
  tag_names TEXT[]
)
RETURNS videos AS $$
DECLARE
  new_video videos;
  tag_id UUID;
  tag_name TEXT;
BEGIN
  -- Insert the video
  INSERT INTO videos (
    title,
    slug,
    description,
    thumbnail_url,
    video_url,
    duration,
    author_id,
    category_id,
    status,
    meta_title,
    meta_description,
    published_at
  )
  VALUES (
    video_data->>'title',
    video_data->>'slug',
    video_data->>'description',
    video_data->>'thumbnail_url',
    video_data->>'video_url',
    (video_data->>'duration')::INTEGER,
    (video_data->>'author_id')::UUID,
    (video_data->>'category_id')::UUID,
    video_data->>'status',
    video_data->>'meta_title',
    video_data->>'meta_description',
    CASE
      WHEN video_data->>'published_at' IS NOT NULL THEN (video_data->>'published_at')::TIMESTAMP WITH TIME ZONE
      WHEN video_data->>'status' = 'published' THEN CURRENT_TIMESTAMP
      ELSE NULL
    END
  )
  RETURNING * INTO new_video;
  
  -- Add tags
  FOREACH tag_name IN ARRAY tag_names
  LOOP
    -- Check if tag exists, if not create it
    INSERT INTO video_tags (name, slug)
    VALUES (
      tag_name,
      LOWER(REGEXP_REPLACE(REGEXP_REPLACE(tag_name, '[^\w\s-]', ''), '\s+', '-', 'g'))
    )
    ON CONFLICT (name) DO NOTHING;
    
    -- Get the tag ID
    SELECT id INTO tag_id FROM video_tags WHERE name = tag_name;
    
    -- Link tag to video
    INSERT INTO videos_tags (video_id, tag_id)
    VALUES (new_video.id, tag_id);
  END LOOP;
  
  RETURN new_video;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add tags to a video
CREATE OR REPLACE FUNCTION add_tags_to_video(
  video_id UUID,
  tag_names TEXT[]
)
RETURNS void AS $$
DECLARE
  tag_id UUID;
  tag_name TEXT;
BEGIN
  FOREACH tag_name IN ARRAY tag_names
  LOOP
    -- Check if tag exists, if not create it
    INSERT INTO video_tags (name, slug)
    VALUES (
      tag_name,
      LOWER(REGEXP_REPLACE(REGEXP_REPLACE(tag_name, '[^\w\s-]', ''), '\s+', '-', 'g'))
    )
    ON CONFLICT (name) DO NOTHING;
    
    -- Get the tag ID
    SELECT id INTO tag_id FROM video_tags WHERE name = tag_name;
    
    -- Link tag to video
    INSERT INTO videos_tags (video_id, tag_id)
    VALUES (video_id, tag_id)
    ON CONFLICT (video_id, tag_id) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create update_updated_at_column function for triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
BEFORE UPDATE ON blog_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
BEFORE UPDATE ON blog_tags
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_albums_updated_at
BEFORE UPDATE ON music_albums
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_categories_updated_at
BEFORE UPDATE ON music_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_tracks_updated_at
BEFORE UPDATE ON music_tracks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON videos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_categories_updated_at
BEFORE UPDATE ON video_categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_tags_updated_at
BEFORE UPDATE ON video_tags
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify that tables and functions were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
AND table_name NOT LIKE 'pg\_%'
AND table_name NOT IN ('schema_migrations', 'spatial_ref_sys');

SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_function_identity_arguments(p.oid) as function_args
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname NOT LIKE 'pg\_%'
AND p.proname IN (
    'increment_blog_views',
    'increment_music_album_views',
    'increment_music_track_plays',
    'increment_video_views',
    'create_blog_post_with_tags',
    'add_tags_to_blog_post',
    'create_video_with_tags',
    'add_tags_to_video',
    'update_updated_at_column'
); 