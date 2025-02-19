export const SITE_CONFIG = {
  name: 'JACO MUSICAL',
  description: 'Gospel Music Artist',
  url: 'https://jacomusical.com',
  author: 'JACO MUSICAL',
  social: {
    youtube: 'https://www.youtube.com/@jacoosijaye',
    instagram: 'https://www.instagram.com/jacomusicals/',
    facebook: 'https://www.facebook.com/jacomusicals',
    tiktok: 'https://www.tiktok.com/@jacomusical/'
  }
}

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Media', path: '/#media' },
  { name: 'Blog', path: '/#blog' },
  { name: 'Contact', path: '/#contact' }
]

export const FEATURED_VIDEOS = [
  {
    id: '1',
    title: 'Amazing Grace (Live Performance)',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85',
    duration: '5:23',
    description: 'A powerful live performance of Amazing Grace at our recent worship service.',
    youtubeId: 'VIDEO_ID_1'
  },
  {
    id: '2',
    title: 'Worship Night Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85',
    duration: '8:45',
    description: 'Highlights from our monthly worship night featuring gospel songs and testimonies.',
    youtubeId: 'VIDEO_ID_2'
  },
  {
    id: '3',
    title: 'Gospel Concert 2024',
    thumbnail: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85',
    duration: '12:30',
    description: 'Full coverage of our annual gospel concert with special guest performances.',
    youtubeId: 'VIDEO_ID_3'
  }
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
    name: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLHCt-UvP4hzNxSz6HFzOdZGQWmc6Uvn-q',
  },
  {
    name: 'Apple Music',
    embedUrl: 'https://embed.music.apple.com/us/album/YOUR_ALBUM_ID',
  },
] 