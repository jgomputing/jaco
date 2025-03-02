-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    meta_title VARCHAR(255),
    meta_description TEXT,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts_tags (junction table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS blog_posts_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create music_categories table
CREATE TABLE IF NOT EXISTS music_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create music_albums table
CREATE TABLE IF NOT EXISTS music_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    cover_image TEXT,
    release_date DATE,
    artist_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES music_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    meta_title VARCHAR(255),
    meta_description TEXT,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create music_tracks table
CREATE TABLE IF NOT EXISTS music_tracks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    album_id UUID REFERENCES music_albums(id) ON DELETE CASCADE,
    track_number INTEGER,
    duration INTEGER, -- Duration in seconds
    audio_url TEXT NOT NULL,
    lyrics TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    plays INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create video_categories table
CREATE TABLE IF NOT EXISTS video_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT NOT NULL,
    duration INTEGER, -- Duration in seconds
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES video_categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    meta_title VARCHAR(255),
    meta_description TEXT,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create video_tags table
CREATE TABLE IF NOT EXISTS video_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create videos_tags (junction table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS videos_tags (
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES video_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (video_id, tag_id)
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_tags_updated_at
    BEFORE UPDATE ON blog_tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_albums_updated_at
    BEFORE UPDATE ON music_albums
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_tracks_updated_at
    BEFORE UPDATE ON music_tracks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_music_categories_updated_at
    BEFORE UPDATE ON music_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_categories_updated_at
    BEFORE UPDATE ON video_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_video_tags_updated_at
    BEFORE UPDATE ON video_tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

CREATE INDEX idx_music_albums_status ON music_albums(status);
CREATE INDEX idx_music_albums_published_at ON music_albums(published_at);
CREATE INDEX idx_music_albums_artist ON music_albums(artist_id);
CREATE INDEX idx_music_albums_category ON music_albums(category_id);
CREATE INDEX idx_music_albums_created_at ON music_albums(created_at);

CREATE INDEX idx_music_tracks_album ON music_tracks(album_id);
CREATE INDEX idx_music_tracks_status ON music_tracks(status);
CREATE INDEX idx_music_tracks_created_at ON music_tracks(created_at);

CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_videos_published_at ON videos(published_at);
CREATE INDEX idx_videos_author ON videos(author_id);
CREATE INDEX idx_videos_category ON videos(category_id);
CREATE INDEX idx_videos_created_at ON videos(created_at);

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'admin'
    ));

CREATE POLICY "Admins can insert users" ON users
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'admin'
    ));

CREATE POLICY "Admins can update users" ON users
    FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'admin'
    ));

CREATE POLICY "Admins can delete users" ON users
    FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND users.role = 'admin'
    ));

-- Create policies for blog_posts table
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins and editors can view all blog posts" ON blog_posts
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.role = 'editor')
    ));

CREATE POLICY "Admins and editors can insert blog posts" ON blog_posts
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.role = 'editor')
    ));

CREATE POLICY "Admins and editors can update blog posts" ON blog_posts
    FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.role = 'editor')
    ));

CREATE POLICY "Admins and editors can delete blog posts" ON blog_posts
    FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.role = 'editor')
    ));

-- Similar policies for other tables (music, videos, settings)
-- For brevity, I'm not including all policies, but they would follow the same pattern

-- Create views for blog posts with related data
CREATE OR REPLACE VIEW view_blog_posts AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.content,
    p.excerpt,
    p.featured_image,
    p.status,
    p.meta_title,
    p.meta_description,
    p.views,
    p.published_at,
    p.created_at,
    p.updated_at,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    u.id AS author_id,
    u.name AS author_name,
    u.avatar_url AS author_avatar,
    ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
FROM blog_posts p
LEFT JOIN blog_categories c ON p.category_id = c.id
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN blog_posts_tags pt ON p.id = pt.post_id
LEFT JOIN blog_tags t ON pt.tag_id = t.id
GROUP BY p.id, c.id, u.id;

-- Create view for music albums with related data
CREATE OR REPLACE VIEW view_music_albums AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.description,
    a.cover_image,
    a.release_date,
    a.status,
    a.meta_title,
    a.meta_description,
    a.views,
    a.published_at,
    a.created_at,
    a.updated_at,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    u.id AS artist_id,
    u.name AS artist_name,
    u.avatar_url AS artist_avatar,
    COUNT(t.id) AS track_count
FROM music_albums a
LEFT JOIN music_categories c ON a.category_id = c.id
LEFT JOIN users u ON a.artist_id = u.id
LEFT JOIN music_tracks t ON a.id = t.album_id
GROUP BY a.id, c.id, u.id;

-- Create view for videos with related data
CREATE OR REPLACE VIEW view_videos AS
SELECT 
    v.id,
    v.title,
    v.slug,
    v.description,
    v.thumbnail_url,
    v.video_url,
    v.duration,
    v.status,
    v.meta_title,
    v.meta_description,
    v.views,
    v.published_at,
    v.created_at,
    v.updated_at,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    u.id AS author_id,
    u.name AS author_name,
    u.avatar_url AS author_avatar,
    ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
FROM videos v
LEFT JOIN video_categories c ON v.category_id = c.id
LEFT JOIN users u ON v.author_id = u.id
LEFT JOIN videos_tags vt ON v.id = vt.video_id
LEFT JOIN video_tags t ON vt.tag_id = t.id
GROUP BY v.id, c.id, u.id; 