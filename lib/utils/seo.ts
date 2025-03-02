import { Metadata } from 'next';

/**
 * Generate SEO metadata for a page
 * 
 * @param title Page title
 * @param description Page description
 * @param image OG image URL
 * @param type OG type
 * @param url Canonical URL
 * @returns Metadata object for Next.js
 */
export function generateMetadata({
  title,
  description,
  image,
  type = 'website',
  url,
}: {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'music' | 'video';
  url?: string;
}): Metadata {
  // Base title
  const baseTitle = 'Jaco Musical';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  
  // Default image
  const defaultImage = '/images/og-image.jpg';
  
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      images: image ? [{ url: image }] : [{ url: defaultImage }],
      siteName: baseTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : [defaultImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate SEO metadata for a blog post
 * 
 * @param post Blog post data
 * @param baseUrl Base URL of the website
 * @returns Metadata object for Next.js
 */
export function generateBlogMetadata(post: any, baseUrl: string): Metadata {
  const url = `${baseUrl}/blog/${post.slug}`;
  
  return generateMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || `Read ${post.title} by ${post.author_name}`,
    image: post.featured_image,
    type: 'article',
    url,
  });
}

/**
 * Generate SEO metadata for a music album
 * 
 * @param album Music album data
 * @param baseUrl Base URL of the website
 * @returns Metadata object for Next.js
 */
export function generateMusicMetadata(album: any, baseUrl: string): Metadata {
  const url = `${baseUrl}/music/${album.slug}`;
  
  return generateMetadata({
    title: album.meta_title || album.title,
    description: album.meta_description || album.description || `Listen to ${album.title} by ${album.artist_name}`,
    image: album.cover_image,
    type: 'music',
    url,
  });
}

/**
 * Generate SEO metadata for a video
 * 
 * @param video Video data
 * @param baseUrl Base URL of the website
 * @returns Metadata object for Next.js
 */
export function generateVideoMetadata(video: any, baseUrl: string): Metadata {
  const url = `${baseUrl}/video/${video.slug}`;
  
  return generateMetadata({
    title: video.meta_title || video.title,
    description: video.meta_description || video.description || `Watch ${video.title} by ${video.author_name}`,
    image: video.thumbnail_url,
    type: 'video',
    url,
  });
}

/**
 * Generate structured data for a blog post (JSON-LD)
 * 
 * @param post Blog post data
 * @param baseUrl Base URL of the website
 * @returns JSON-LD structured data as a string
 */
export function generateBlogJsonLd(post: any, baseUrl: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt || post.meta_description,
    'image': post.featured_image ? [post.featured_image] : [],
    'datePublished': post.published_at,
    'dateModified': post.updated_at,
    'author': {
      '@type': 'Person',
      'name': post.author_name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Jaco Musical',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    }
  };
  
  return JSON.stringify(data);
}

/**
 * Generate structured data for a music album (JSON-LD)
 * 
 * @param album Music album data
 * @param tracks Album tracks
 * @param baseUrl Base URL of the website
 * @returns JSON-LD structured data as a string
 */
export function generateMusicJsonLd(album: any, tracks: any[], baseUrl: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    'name': album.title,
    'description': album.description || album.meta_description,
    'image': album.cover_image,
    'datePublished': album.published_at || album.release_date,
    'byArtist': {
      '@type': 'MusicGroup',
      'name': album.artist_name
    },
    'numTracks': tracks.length,
    'track': tracks.map(track => ({
      '@type': 'MusicRecording',
      'name': track.title,
      'duration': track.duration ? `PT${Math.floor(track.duration / 60)}M${track.duration % 60}S` : undefined,
      'url': `${baseUrl}/music/${album.slug}?track=${track.id}`
    }))
  };
  
  return JSON.stringify(data);
}

/**
 * Generate structured data for a video (JSON-LD)
 * 
 * @param video Video data
 * @param baseUrl Base URL of the website
 * @returns JSON-LD structured data as a string
 */
export function generateVideoJsonLd(video: any, baseUrl: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': video.title,
    'description': video.description || video.meta_description,
    'thumbnailUrl': video.thumbnail_url,
    'uploadDate': video.published_at,
    'duration': video.duration ? `PT${Math.floor(video.duration / 60)}M${video.duration % 60}S` : undefined,
    'contentUrl': video.video_url,
    'embedUrl': video.video_url,
    'author': {
      '@type': 'Person',
      'name': video.author_name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Jaco Musical',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/logo.png`
      }
    }
  };
  
  return JSON.stringify(data);
} 