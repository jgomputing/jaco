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