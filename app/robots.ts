import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for the application
 * 
 * @returns Robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jacomusical.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 