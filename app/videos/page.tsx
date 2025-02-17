'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaHeart, FaShare, FaClock, FaCalendar, FaEye, FaChurch, FaVideo, FaUserFriends } from 'react-icons/fa'
import Image from 'next/image'

// Enhanced Video Categories with descriptions
const VIDEO_CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Videos', 
    icon: <FaPlay className="text-xl" />,
    description: 'Browse our complete collection'
  },
  { 
    id: 'worship', 
    name: 'Live Worship', 
    icon: <FaChurch className="text-xl" />,
    description: 'Experience our worship services'
  },
  { 
    id: 'performances', 
    name: 'Performances', 
    icon: <FaVideo className="text-xl" />,
    description: 'Special musical performances'
  },
  { 
    id: 'behind-scenes', 
    name: 'Behind the Scenes', 
    icon: <FaUserFriends className="text-xl" />,
    description: 'Get to know our journey'
  }
]

// Enhanced Video Data with more metadata
const VIDEO_DATA = [
  {
    id: 1,
    title: "Sunday Worship Service Highlights",
    category: "worship",
    youtubeId: "3c6HrdtX5iA",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "Experience the powerful moments from our Sunday worship service",
    duration: "15:23",
    date: "Dec 15, 2023",
    views: "1.2K",
    featured: true,
    tags: ['worship', 'live', 'sunday-service'],
    location: "Main Sanctuary"
  },
  {
    id: 2,
    title: "Behind the Music: Making of 'Divine Love'",
    category: "behind-scenes",
    youtubeId: "3c6HrdtX5iA",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "Get an exclusive look at how we created our latest worship song",
    duration: "8:45",
    date: "Dec 10, 2023",
    views: "856",
    tags: ['behind-scenes', 'recording', 'documentary'],
    location: "Recording Studio"
  },
  {
    id: 3,
    title: "Christmas Special Worship Night",
    category: "performances",
    youtubeId: "3c6HrdtX5iA",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "Full recording of our special Christmas worship night",
    duration: "45:30",
    date: "Dec 25, 2023",
    views: "2.3K",
    featured: true,
    tags: ['christmas', 'special', 'worship'],
    location: "Grand Hall"
  }
]

// Enhanced Featured Video Component with 3D hover effect
const FeaturedVideo = ({ video }: { video: typeof VIDEO_DATA[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative h-[600px] rounded-2xl overflow-hidden mb-16 group perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-full transform-gpu transition-transform duration-700 group-hover:scale-105">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1 bg-[#3b82f6] rounded-full text-sm font-medium">Featured</span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaClock className="text-[#3b82f6]" /> {video.duration}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaEye className="text-[#3b82f6]" /> {video.views} views
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaChurch className="text-[#3b82f6]" /> {video.location}
            </span>
          </div>

          {/* Title and Description */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {video.title}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {video.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-full hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <FaPlay /> Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-3 border border-white/20 hover:border-white/30"
            >
              <FaShare /> Share
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Hover Effect Overlay */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.div>
  )
}

// Enhanced Video Card Component with 3D effect
const VideoCard = ({ video }: { video: typeof VIDEO_DATA[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transform-gpu group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-colors duration-300" />
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg hover:bg-[#2563eb] transition-colors"
          >
            <FaPlay size={24} />
          </motion.button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
          {video.duration}
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-2">
          <FaChurch className="text-[#3b82f6]" />
          {video.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium text-white/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
            <p className="text-white/60 text-sm">{video.description}</p>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm flex items-center gap-2">
              <FaCalendar className="text-[#3b82f6]" /> {video.date}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-2">
              <FaEye className="text-[#3b82f6]" /> {video.views} views
            </span>
          </div>
          
          {/* Share Button */}
          <button
            onClick={() => {
              navigator.share({
                title: video.title,
                text: video.description,
                url: `https://youtube.com/watch?v=${video.youtubeId}`
              }).catch(console.error)
            }}
            className="text-white/70 hover:text-[#3b82f6] transition-colors"
          >
            <FaShare size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Category Card Component
const CategoryCard = ({ category, isActive, onClick }: { 
  category: typeof VIDEO_CATEGORIES[0], 
  isActive: boolean,
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    className={`p-4 rounded-2xl text-left transition-all duration-300 flex flex-col gap-2 ${
      isActive
        ? 'bg-[#3b82f6] text-white'
        : 'bg-white/10 text-white/70 hover:bg-white/20'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
      {category.icon}
    </div>
    <div>
      <h3 className="font-semibold">{category.name}</h3>
      <p className="text-sm opacity-80">{category.description}</p>
    </div>
  </motion.button>
)

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const featuredVideos = VIDEO_DATA.filter(video => video.featured)
  const filteredVideos = activeCategory === 'all' 
    ? VIDEO_DATA 
    : VIDEO_DATA.filter(video => video.category === activeCategory)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Videos & Performances
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Experience our worship services, behind-the-scenes moments, and special performances. Join us in praising the Lord through these captured moments.
          </p>
        </motion.div>

        {/* Featured Video */}
        {featuredVideos.length > 0 && (
          <FeaturedVideo video={featuredVideos[0]} />
        )}

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {VIDEO_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Loading Skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-white/10" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 rounded-full w-3/4" />
                    <div className="h-4 bg-white/10 rounded-full w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 