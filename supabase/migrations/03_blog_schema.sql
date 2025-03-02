-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Drop existing indexes
DROP INDEX IF EXISTS blog_posts_author_id_idx;
DROP INDEX IF EXISTS blog_posts_category_id_idx;
DROP INDEX IF EXISTS blog_posts_status_idx;
DROP INDEX IF EXISTS blog_posts_published_at_idx;
DROP INDEX IF EXISTS blog_posts_tags_idx;
DROP INDEX IF EXISTS blog_posts_title_trgm_idx;
DROP INDEX IF EXISTS blog_posts_content_trgm_idx;

-- Drop existing tables and related objects
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS increment_blog_views(UUID) CASCADE;

-- Create blog categories table
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog tags table
CREATE TABLE blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tags TEXT[] DEFAULT '{}',
  meta_title VARCHAR(200),
  meta_description TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX blog_posts_author_id_idx ON blog_posts(author_id);
CREATE INDEX blog_posts_category_id_idx ON blog_posts(category_id);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX blog_posts_tags_idx ON blog_posts USING GIN(tags);

-- Create trigram indexes for full text search
CREATE INDEX blog_posts_title_trgm_idx ON blog_posts USING GIN(title gin_trgm_ops);
CREATE INDEX blog_posts_content_trgm_idx ON blog_posts USING GIN(content gin_trgm_ops);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
  BEFORE UPDATE ON blog_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to increment views atomically
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_categories
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable read access for all users" ON blog_categories;
  DROP POLICY IF EXISTS "Enable write access for authenticated users" ON blog_categories;
  
  CREATE POLICY "Enable read access for all users" ON blog_categories
    FOR SELECT USING (true);
  
  CREATE POLICY "Enable write access for authenticated users" ON blog_categories
    FOR ALL USING (auth.role() = 'authenticated');
END $$;

-- Create policies for blog_tags
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable read access for all users" ON blog_tags;
  DROP POLICY IF EXISTS "Enable write access for authenticated users" ON blog_tags;
  
  CREATE POLICY "Enable read access for all users" ON blog_tags
    FOR SELECT USING (true);
  
  CREATE POLICY "Enable write access for authenticated users" ON blog_tags
    FOR ALL USING (auth.role() = 'authenticated');
END $$;

-- Create policies for blog_posts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Enable read access for published posts" ON blog_posts;
  DROP POLICY IF EXISTS "Enable write access for authenticated users" ON blog_posts;
  
  CREATE POLICY "Enable read access for published posts" ON blog_posts
    FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
  
  CREATE POLICY "Enable write access for authenticated users" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');
END $$;

-- Insert some default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Posts about technology and software development'),
  ('Music', 'music', 'Posts about music and audio production'),
  ('News', 'news', 'Latest news and updates'),
  ('Tutorials', 'tutorials', 'How-to guides and tutorials');

-- Insert some default tags
INSERT INTO blog_tags (name, slug) VALUES
  ('Web Development', 'web-development'),
  ('JavaScript', 'javascript'),
  ('React', 'react'),
  ('Next.js', 'nextjs'),
  ('TypeScript', 'typescript'),
  ('Music Production', 'music-production'),
  ('Audio Engineering', 'audio-engineering'),
  ('Tips & Tricks', 'tips-tricks'); 