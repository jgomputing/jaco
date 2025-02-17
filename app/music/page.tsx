'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaSpotify, FaYoutube, FaHeart, FaShare, FaClock, FaCalendar, FaMusic } from 'react-icons/fa'
import Image from 'next/image'

// Music Categories
const MUSIC_CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Music', 
    icon: <FaMusic className="text-xl" />,
    description: 'Browse our complete collection'
  },
  { 
    id: 'worship', 
    name: 'Worship', 
    icon: <FaHeart className="text-xl" />,
    description: 'Spiritual worship songs'
  },
  { 
    id: 'gospel', 
    name: 'Gospel', 
    icon: <FaMusic className="text-xl" />,
    description: 'Contemporary gospel music'
  },
  { 
    id: 'albums', 
    name: 'Albums', 
    icon: <FaSpotify className="text-xl" />,
    description: 'Full album collections'
  }
]

// Sample Music Data
const MUSIC_DATA = [
  {
    id: 1,
    title: "Amazing Grace (Live Worship)",
    category: "worship",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "track/0tgVpDi06FyKpA1z0VMD4v",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "A powerful rendition of the classic hymn",
    duration: "5:23",
    releaseDate: "Dec 15, 2023",
    featured: true,
    plays: "1.2K"
  },
  {
    id: 2,
    title: "Divine Love",
    category: "gospel",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "track/0tgVpDi06FyKpA1z0VMD4v",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "An uplifting praise song celebrating God's love",
    duration: "4:45",
    releaseDate: "Dec 10, 2023",
    plays: "856"
  },
  {
    id: 3,
    title: "Heavenly Worship Album",
    category: "albums",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "album/0tgVpDi06FyKpA1z0VMD4v",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "A collection of worship songs",
    duration: "45:30",
    releaseDate: "Dec 1, 2023",
    featured: true,
    plays: "2.3K"
  }
]

// Featured Music Component
const FeaturedMusic = ({ music }: { music: typeof MUSIC_DATA[0] }) => {
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
          src={music.thumbnail}
          alt={music.title}
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
          {/* Category Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-4 py-1 bg-[#3b82f6] rounded-full text-sm font-medium text-white">Featured</span>
            <span className="px-4 py-1 bg-black/70 backdrop-blur-sm rounded-full text-sm font-medium text-white">{music.category}</span>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaClock className="text-[#3b82f6]" /> {music.duration}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaPlay className="text-[#3b82f6]" /> {music.plays} plays
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FaCalendar className="text-[#3b82f6]" /> {music.releaseDate}
            </span>
          </div>

          {/* Title and Description */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {music.title}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {music.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={`https://open.spotify.com/${music.spotifyId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-all duration-300 shadow-lg"
            >
              <FaSpotify /> Listen on Spotify
            </a>
            <a
              href={`https://youtube.com/watch?v=${music.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FaYoutube /> Watch on YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Music Card Component
const MusicCard = ({ music }: { music: typeof MUSIC_DATA[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={music.thumbnail}
          alt={music.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <a
            href={`https://open.spotify.com/${music.spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center text-white shadow-lg hover:bg-[#1ed760] transition-colors"
          >
            <FaSpotify size={20} />
          </a>
          <a
            href={`https://youtube.com/watch?v=${music.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-lg hover:bg-[#ff1a1a] transition-colors"
          >
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
          {music.duration}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#3b82f6] rounded-full text-white text-sm">
          {music.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
          {music.title}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {music.description}
        </p>

        {/* Music Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm flex items-center gap-2">
              <FaCalendar className="text-[#3b82f6]" /> {music.releaseDate}
            </span>
            <span className="text-white/40 text-sm flex items-center gap-2">
              <FaPlay className="text-[#3b82f6]" /> {music.plays} plays
            </span>
          </div>
          
          {/* Share Button */}
          <button
            onClick={() => {
              navigator.share({
                title: music.title,
                text: music.description,
                url: `https://open.spotify.com/${music.spotifyId}`
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
  category: typeof MUSIC_CATEGORIES[0], 
  isActive: boolean,
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    className={`p-6 rounded-2xl text-left transition-all duration-300 flex flex-col gap-3 ${
      isActive
        ? 'bg-[#3b82f6] text-white'
        : 'bg-white/5 text-white/70 hover:bg-white/10'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
      {category.icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg">{category.name}</h3>
      <p className="text-sm opacity-80">{category.description}</p>
    </div>
  </motion.button>
)

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const featuredMusic = MUSIC_DATA.find(music => music.featured)
  const filteredMusic = MUSIC_DATA.filter(music => 
    (activeCategory === 'all' || music.category === activeCategory) &&
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Music Gallery
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Experience our collection of worship and gospel music. Listen, share, and connect with God through melody.
          </p>
        </motion.div>

        {/* Featured Music */}
        {featuredMusic && <FeaturedMusic music={featuredMusic} />}

        {/* Search Bar */}
        <div className="max-w-xl mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MUSIC_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* Music Grid */}
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
              filteredMusic.map((music) => (
                <MusicCard key={music.id} music={music} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 