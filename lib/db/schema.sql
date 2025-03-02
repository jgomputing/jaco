-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
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
    featured_image VARCHAR(255),
    featured_image_thumbnail VARCHAR(255),
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts_tags (junction table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS blog_posts_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON blog_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some default categories
INSERT INTO blog_categories (name, slug) VALUES
    ('Personal Journey', 'personal-journey'),
    ('Events', 'events'),
    ('Industry Insights', 'industry-insights'),
    ('News', 'news'),
    ('Music', 'music')
ON CONFLICT (slug) DO NOTHING;

-- Create view for blog posts with related data
CREATE OR REPLACE VIEW view_blog_posts AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.content,
    p.excerpt,
    p.featured_image,
    p.featured_image_thumbnail,
    p.status,
    p.views,
    p.published_at,
    p.created_at,
    p.updated_at,
    c.name AS category_name,
    c.slug AS category_slug,
    u.name AS author_name,
    u.email AS author_email,
    ARRAY_AGG(t.name) FILTER (WHERE t.name IS NOT NULL) AS tags
FROM blog_posts p
LEFT JOIN blog_categories c ON p.category_id = c.id
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN blog_posts_tags pt ON p.id = pt.post_id
LEFT JOIN blog_tags t ON pt.tag_id = t.id
GROUP BY p.id, c.id, u.id; 