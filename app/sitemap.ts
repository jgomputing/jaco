import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

/**
 * Generate a sitemap for the application
 * 
 * @returns Sitemap configuration
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jacomusical.com';
  
  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
  
  // Fetch published blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published');
  
  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Fetch published music albums
  const { data: musicAlbums } = await supabase
    .from('music_albums')
    .select('slug, updated_at')
    .eq('status', 'published');
  
  const musicRoutes = (musicAlbums || []).map((album) => ({
    url: `${baseUrl}/music/${album.slug}`,
    lastModified: new Date(album.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Fetch published videos
  const { data: videos } = await supabase
    .from('videos')
    .select('slug, updated_at')
    .eq('status', 'published');
  
  const videoRoutes = (videos || []).map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: new Date(video.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Combine all routes
  return [...routes, ...blogRoutes, ...musicRoutes, ...videoRoutes];
} 