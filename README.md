# Supabase Integration for Real-Time Content Management

This project uses Supabase for database management and real-time synchronization between the Admin Panel and Frontend Website. The implementation includes a structured database setup, real-time event listeners, and API endpoints for CRUD operations.

## Features

- **Database Schema**: Tables for Users, Blog, Music, Videos, and Settings with UUID primary keys and proper foreign key constraints.
- **Real-Time Sync**: Instant updates between Admin Panel and Frontend using Supabase Realtime.
- **API Endpoints**: Complete CRUD operations for all content types.
- **Cursor-Based Pagination**: Efficient data fetching for large datasets.
- **Row Level Security**: Proper access control for different user roles.
- **SEO Optimization**: Built-in SEO features including metadata, structured data, sitemap, and robots.txt.
- **Google Fonts**: Uses Titillium Web font from Google for consistent typography.

## Database Schema

The database schema is defined in `lib/db/supabase-schema.sql` and includes:

- **Users**: Authentication and user management
- **Blog**: Posts, categories, and tags
- **Music**: Albums, tracks, and categories
- **Videos**: Video content, categories, and tags
- **Settings**: Application settings and configuration

## API Services

The following services are available for interacting with the database:

- **BlogService**: CRUD operations for blog posts, categories, and tags
- **MusicService**: CRUD operations for music albums, tracks, and categories
- **VideoService**: CRUD operations for videos, categories, and tags
- **SettingsService**: Operations for application settings

## Real-Time Updates

Real-time updates are implemented using Supabase's real-time capabilities:

```tsx
// Example: Setting up a real-time listener for blog posts
import { useBlogRealtime } from '@/lib/hooks/useRealtime';

function BlogList() {
  const { latestPayload, isConnected } = useBlogRealtime((payload) => {
    // Handle real-time updates
    console.log('Blog update:', payload);
  });
  
  // Rest of component...
}
```

The application includes a `RealtimeProvider` that sets up listeners for all content types:

```tsx
// In _app.tsx or layout.tsx
import { RealtimeProvider } from '@/components/RealtimeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <RealtimeProvider>
      <Component {...pageProps} />
    </RealtimeProvider>
  );
}
```

## Pagination

Cursor-based pagination is implemented for efficient data fetching:

```tsx
// Example: Using pagination for blog posts
import { usePagination } from '@/lib/hooks/usePagination';
import { BlogService } from '@/lib/services/blog-service';

function BlogList() {
  const {
    data: posts,
    isLoading,
    error,
    hasMore,
    loadMore
  } = usePagination({
    fetchFunction: BlogService.getBlogPosts,
    initialLimit: 10
  });
  
  // Rest of component...
}
```

## SEO Optimization

The application includes several SEO features:

### Metadata Generation

```tsx
// Example: Generating metadata for a blog post page
import { generateBlogMetadata } from '@/lib/utils/seo';

export async function generateMetadata({ params }) {
  const post = await BlogService.getBlogPostBySlug(params.slug);
  return generateBlogMetadata(post, process.env.NEXT_PUBLIC_BASE_URL);
}
```

### Structured Data (JSON-LD)

```tsx
// Example: Adding structured data to a blog post page
import JsonLd from '@/components/JsonLd';
import { generateBlogJsonLd } from '@/lib/utils/seo';

export default function BlogPost({ post }) {
  const jsonLd = generateBlogJsonLd(post, process.env.NEXT_PUBLIC_BASE_URL);
  
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Rest of component */}
    </>
  );
}
```

### Sitemap and Robots.txt

The application automatically generates a sitemap and robots.txt file based on the content in the database.

## Security

Row Level Security (RLS) is configured in Supabase to ensure:

- Public users have read-only access to published content
- Only authenticated admins can modify data
- Private settings are only accessible to admins

## Environment Setup

To use this implementation, you need to set up the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_BASE_URL=your-website-url
```

## Getting Started

1. Create a Supabase project
2. Run the SQL schema in `lib/db/supabase-schema.sql`
3. Run the SQL functions in `lib/db/supabase-functions.sql`
4. Set up environment variables
5. Start the application with `npm run dev`

## API Endpoints

The following API endpoints are available:

- **Blog**:
  - `GET /api/blog`: Get all blog posts with pagination
  - `POST /api/blog`: Create a new blog post
  - `GET /api/blog/[id]`: Get a blog post by ID
  - `PUT /api/blog/[id]`: Update a blog post
  - `DELETE /api/blog/[id]`: Delete a blog post

- **Music**:
  - `GET /api/music`: Get all music albums with pagination
  - `POST /api/music`: Create a new music album
  - `GET /api/music/[id]`: Get a music album by ID
  - `PUT /api/music/[id]`: Update a music album
  - `DELETE /api/music/[id]`: Delete a music album
  - `GET /api/music/tracks`: Get tracks for an album
  - `POST /api/music/tracks`: Create a new music track
  - `GET /api/music/tracks/[id]`: Get a music track by ID
  - `PUT /api/music/tracks/[id]`: Update a music track
  - `DELETE /api/music/tracks/[id]`: Delete a music track

- **Video**:
  - `GET /api/video`: Get all videos with pagination
  - `POST /api/video`: Create a new video
  - `GET /api/video/[id]`: Get a video by ID
  - `PUT /api/video/[id]`: Update a video
  - `DELETE /api/video/[id]`: Delete a video

- **Settings**:
  - `GET /api/settings`: Get all settings
  - `POST /api/settings`: Create or update a setting
  - `GET /api/settings/[key]`: Get a setting by key
  - `DELETE /api/settings/[key]`: Delete a setting