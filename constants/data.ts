import { FaMusic, FaBlog, FaEnvelope, FaVideo, FaStore, FaHeart, FaHome } from 'react-icons/fa'

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'About', path: '/#about', icon: FaHeart },
  { name: 'Media', path: '/#media', icon: FaMusic },
  { name: 'Blog', path: '/#blog', icon: FaBlog },
  { name: 'Contact', path: '/#contact', icon: FaEnvelope }
]

// Recent Releases
export const RECENT_RELEASES = [
  {
    id: 1,
    title: "Song Title 1",
    description: "Bringing hearts closer to God through melodic worship",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    duration: "3:45",
    type: "Single",
    spotifyUrl: "#",
    youtubeUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Song Title 2",
    description: "A powerful expression of God's endless love",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    duration: "3:45",
    type: "Single",
    spotifyUrl: "#",
    youtubeUrl: "#",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Song Title 3",
    description: "Uplifting worship songs for spiritual renewal",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    duration: "3:45",
    type: "Single",
    spotifyUrl: "#",
    youtubeUrl: "#",
    downloadUrl: "#"
  }
]

// Social Media Links
export const SOCIAL_LINKS = [
  { platform: 'YouTube', url: '#', color: 'from-red-500 to-red-600' },
  { platform: 'Spotify', url: '#', color: 'from-green-500 to-green-600' },
  { platform: 'Instagram', url: '#', color: 'from-purple-500 to-pink-500' },
  { platform: 'Facebook', url: '#', color: 'from-blue-500 to-blue-600' },
  { platform: 'TikTok', url: '#', color: 'from-gray-800 to-black' }
]

// Contact Information
export const CONTACT_INFO = {
  email: "contact@jacomusical.com",
  phone: "+1 (555) 123-4567",
  address: "123 Worship Street, Music City, MC 12345"
}

// Journey Milestones
export const JOURNEY_MILESTONES = [
  {
    year: '2013',
    title: 'Beginning of Ministry',
    description: 'Started our musical journey in local church events'
  },
  {
    year: '2015',
    title: 'First Album Release',
    description: 'Released our debut gospel album "Divine Love"'
  },
  {
    year: '2018',
    title: 'Ministry Expansion',
    description: 'Began performing at major gospel events nationwide'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched online worship sessions during pandemic'
  },
  {
    year: '2023',
    title: 'Global Outreach',
    description: 'Reaching global audience through digital platforms'
  }
] 