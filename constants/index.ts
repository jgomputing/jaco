export const SITE_CONFIG = {
  name: 'JACO MUSICAL',
  description: 'Gospel Music Artist',
  url: 'https://jacomusical.com',
  author: 'JACO MUSICAL',
  social: {
    youtube: 'https://youtube.com/@jacomusical',
    spotify: 'https://open.spotify.com/artist/jacomusical',
    instagram: 'https://instagram.com/jacomusical',
    facebook: 'https://facebook.com/jacomusical',
    tiktok: 'https://tiktok.com/@jacomusical',
  }
}

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Music', path: '/music' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export const FEATURED_VIDEOS = [
  {
    id: 'video1',
    title: 'Amazing Grace',
    thumbnail: '/images/videos/video1.jpg',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID',
  },
  // Add more videos
]

export const LATEST_BLOG_POSTS = [
  {
    id: '1',
    title: 'The Journey of Gospel Music',
    excerpt: 'Exploring the rich history and evolution of gospel music through the ages.',
    date: '2024-02-17',
    image: '/images/blog/post1.jpg',
    slug: 'journey-of-gospel-music'
  },
  {
    id: '2',
    title: 'Behind the Scenes: Latest Album',
    excerpt: 'Get an exclusive look at the making of our latest worship album.',
    date: '2024-02-15',
    image: '/images/blog/post2.jpg',
    slug: 'behind-the-scenes-latest-album'
  },
  {
    id: '3',
    title: 'Worship Experience: Live Event',
    excerpt: 'Relive the moments from our recent live worship experience.',
    date: '2024-02-10',
    image: '/images/blog/post3.jpg',
    slug: 'worship-experience-live-event'
  }
]

export const MUSIC_PLATFORMS = [
  {
    name: 'Spotify',
    embedUrl: 'https://open.spotify.com/embed/artist/YOUR_ARTIST_ID',
  },
  {
    name: 'Apple Music',
    embedUrl: 'https://embed.music.apple.com/us/album/YOUR_ALBUM_ID',
  },
] 