'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaBlog, FaEnvelope, FaBars, FaTimes, FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok, FaHeart, FaCross, FaPrayingHands, FaChurch, FaPlay, FaArrowRight, FaMapMarkerAlt, FaVideo } from 'react-icons/fa'

// Navigation Links
const NAVIGATION_LINKS = [
  { name: 'About', path: '/#about' },
  { name: 'Music', path: '/#music' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
]

// Hero Slides
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85',
    title: "Spreading God's Love Through Music",
    subtitle: "Available for gospel events and special performances"
  },
  {
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85',
    title: "Book Me for Your Event",
    subtitle: "Bringing the spirit of gospel music to your special occasions"
  },
  {
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85',
    title: "Latest Releases",
    subtitle: "Discover our newest gospel songs and performances"
  }
]

// About Images
const ABOUT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85',
    alt: 'Worship Performance',
    caption: 'Worship Through Music',
    description: 'Bringing hearts closer to God through melodic worship'
  },
  {
    src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85',
    alt: 'Musical Performance',
    caption: 'Live Performances',
    description: 'Creating immersive spiritual experiences'
  },
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85',
    alt: 'Gospel Choir',
    caption: 'Community & Worship',
    description: 'Uniting voices in praise and worship'
  }
]

// Add this after the ABOUT_IMAGES constant
const MINISTRY_STATS = [
  { number: '10+', label: 'Years of Ministry', icon: <FaCross className="text-4xl text-[#3b82f6]" /> },
  { number: '1000+', label: 'Lives Touched', icon: <FaHeart className="text-4xl text-[#3b82f6]" /> },
  { number: '50+', label: 'Gospel Events', icon: <FaChurch className="text-4xl text-[#3b82f6]" /> },
  { number: '20+', label: 'Original Songs', icon: <FaMusic className="text-4xl text-[#3b82f6]" /> }
]

const JOURNEY_MILESTONES = [
  {
    year: '2013',
    title: 'Musical Awakening',
    description: 'First encounter with gospel music ministry'
  },
  {
    year: '2015',
    title: 'First Album Release',
    description: 'Debut album "Divine Melodies" launched'
  },
  {
    year: '2018',
    title: 'Ministry Expansion',
    description: 'Started reaching international audiences'
  },
  {
    year: '2023',
    title: 'Global Impact',
    description: 'Touching lives across continents through music'
  }
]

// Featured Music Data
const FEATURED_MUSIC = [
  {
    id: 1,
    title: "Amazing Grace (Live Worship)",
    category: "worship",
    type: "singles",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "track/0tgVpDi06FyKpA1z0VMD4v",
    appleMusicId: "amazing-grace-live",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "A powerful rendition of the classic hymn",
    duration: "5:23",
    releaseDate: "2023"
  },
  {
    id: 2,
    title: "Divine Love",
    category: "praise",
    type: "singles",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "track/0tgVpDi06FyKpA1z0VMD4v",
    appleMusicId: "divine-love",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "An uplifting praise song celebrating God's love",
    duration: "4:45",
    releaseDate: "2023"
  },
  {
    id: 3,
    title: "Heavenly Worship Album",
    category: "worship",
    type: "albums",
    youtubeId: "3c6HrdtX5iA",
    spotifyId: "album/0tgVpDi06FyKpA1z0VMD4v",
    appleMusicId: "heavenly-worship",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "A collection of worship songs",
    duration: "45:30",
    releaseDate: "2023"
  }
]

// Featured Videos Data
const FEATURED_VIDEOS = [
  {
    id: 1,
    title: "Sunday Worship Highlights",
    category: "Live Worship",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    duration: "15:23",
    views: "1.2K",
    date: "2 weeks ago"
  },
  {
    id: 2,
    title: "Behind the Scenes - Studio Session",
    category: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    duration: "8:45",
    views: "856",
    date: "1 week ago"
  },
  {
    id: 3,
    title: "Christmas Special Performance",
    category: "Live Performance",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    duration: "45:30",
    views: "2.3K",
    date: "3 days ago"
  }
]

// Update the UPCOMING_EVENTS constant
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Christmas Special Performance",
    date: "Dec 24, 2023",
    time: "7:00 PM",
    location: "Grace Community Center",
    type: "Live Performance",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "Join us for a magical evening of gospel music and celebration"
  },
  {
    id: 2,
    title: "Youth Music Festival",
    date: "Jan 15, 2024",
    time: "6:30 PM",
    location: "Hope Center Arena",
    type: "Festival Performance",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "Special performance at the annual youth music festival"
  },
  {
    id: 3,
    title: "Songwriting Workshop",
    date: "Jan 28, 2024",
    time: "2:00 PM",
    location: "Music Academy Hall",
    type: "Workshop",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "Learn songwriting techniques and music production"
  }
]

// Hero Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={HERO_SLIDES[currentSlide].image}
            alt={HERO_SLIDES[currentSlide].title}
            fill
            priority
            className="object-cover object-center transform-gpu"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-[2]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col">
        <div className="flex-1 flex items-center pt-20 md:pt-0">
          <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
            <div className="max-w-6xl">
              <div className="space-y-8">
                {/* Main Title */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl">
                    <span className="inline-block">Spreading</span>{" "}
                    <span className="inline-block text-[#3b82f6]">
                      God's Love
                    </span>{" "}
                    <span className="inline-block">Through Music</span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed">
                    Join JACO MUSICAL on a spiritual journey through gospel music. Available for church events, gospel concerts, and special occasions. Let's create an unforgettable worship experience together.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href="/events#booking"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Book for Your Event <FaMusic className="text-xl" />
                  </Link>
                  <Link
                    href="/#music"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    Listen to Music <FaPlay className="text-sm" />
                  </Link>
                </motion.div>

                {/* Booking Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-block"
                >
                  <div className="px-4 py-2 bg-[#3b82f6]/20 backdrop-blur-sm rounded-full border border-[#3b82f6]/30">
                    <span className="text-[#3b82f6] font-medium">Available for Gospel Events & Special Occasions</span>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-12 md:mt-16"
                >
                  <div className="inline-flex flex-col gap-4">
                    <span className="text-white/60 text-sm tracking-wider uppercase">Connect With Us</span>
                    <div className="flex gap-6 md:gap-8">
                      <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-all duration-300">
                        <FaYoutube size={24} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-all duration-300">
                        <FaSpotify size={24} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-all duration-300">
                        <FaInstagram size={24} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-all duration-300">
                        <FaFacebookF size={24} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-[#3b82f6] transition-all duration-300">
                        <FaTiktok size={24} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-8 flex gap-4 z-20">
        {HERO_SLIDES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-[#3b82f6]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// About Slideshow component
const ImageSlideshow = ({ currentIndex }: { currentIndex: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const nextIndex = (currentIndex + 1) % ABOUT_IMAGES.length
  const prevIndex = (currentIndex - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length

  return (
    <div 
      className="relative h-[600px] rounded-2xl overflow-hidden group perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Previous Image (Blurred) */}
      <div className="absolute inset-0 opacity-30 blur-sm">
        <Image
          src={ABOUT_IMAGES[prevIndex].src}
          alt={ABOUT_IMAGES[prevIndex].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Main Image */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            rotateY: 0, 
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
          exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={ABOUT_IMAGES[currentIndex].src}
            alt={ABOUT_IMAGES[currentIndex].alt}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-3">
                {ABOUT_IMAGES[currentIndex].caption}
              </h3>
              <p className="text-white/80 text-lg">
                {ABOUT_IMAGES[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next Image Preview (Blurred) */}
      <div className="absolute inset-0 opacity-30 blur-sm">
        <Image
          src={ABOUT_IMAGES[nextIndex].src}
          alt={ABOUT_IMAGES[nextIndex].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Navigation Arrows */}
      <div className={`absolute inset-0 flex items-center justify-between p-4 z-30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          className="h-full bg-[#3b82f6]"
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 left-8 flex gap-3 z-30">
        {ABOUT_IMAGES.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 transition-all duration-300 rounded-full cursor-pointer
              ${index === currentIndex ? 'w-8 bg-[#3b82f6]' : 'w-4 bg-white/50 hover:bg-white/70'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

// Media Section Component
const MediaSection = () => {
  const [activeTab, setActiveTab] = useState('music')

  return (
    <section id="music" className="py-20 relative">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Music & Videos
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience our worship through music and visual performances. Listen to our latest releases and watch our ministry in action.
          </p>
        </motion.div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link 
            href="/music"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full transition-colors text-sm sm:text-base"
          >
            <FaMusic className="text-lg" /> Music
          </Link>
          <Link 
            href="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm sm:text-base"
          >
            <FaVideo className="text-lg" /> Videos
          </Link>
        </div>

        {/* Featured Album Card */}
        <div className="glass-card p-4 sm:p-6 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Divine Love Album</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <a
              href="#"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-full transition-colors text-xs sm:text-sm"
            >
              <FaSpotify className="text-base sm:text-lg" /> 
              <span className="flex flex-col leading-tight text-center">
                <span>Listen on</span>
                <span>Spotify</span>
              </span>
            </a>
            <button
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-xs sm:text-sm"
            >
              <FaPlay className="text-base sm:text-lg" /> Preview
            </button>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Recent Releases</h3>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'music' ? (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Featured Album */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/9]">
                <Image
                  src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85"
                  alt="Latest Album"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[#3b82f6] font-medium mb-2">Latest Release</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Divine Love Album</h3>
                  <div className="flex gap-4">
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-full hover:bg-[#2563eb] transition-colors">
                      <FaSpotify /> Listen on Spotify
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                      <FaPlay /> Preview
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent Releases */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Recent Releases</h3>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={`https://images.unsplash.com/photo-${item === 1 ? '1510915361894-db8b60106cb1' : item === 2 ? '1429962714451-bb934ecdc4ec' : '1415201364774-f6f0bb35f28f'}?auto=format&fit=crop&q=85`}
                          alt="Song thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-[#3b82f6] transition-colors">Song Title {item}</h4>
                        <p className="text-white/60 text-sm">3:45</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#3b82f6] hover:text-white transition-all">
                        <FaPlay />
                      </button>
                    </div>
                  </div>
                ))}

                {/* View All Music Link */}
                <Link
                  href="/music"
                  className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors"
                >
                  View All Music <FaMusic className="text-sm" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Featured Video */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/9]">
                <Image
                  src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85"
                  alt="Featured Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[#3b82f6] font-medium mb-2">Featured Performance</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Latest Worship Service</h3>
                  <div className="flex gap-4">
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-full hover:bg-[#2563eb] transition-colors">
                      <FaYoutube /> Watch on YouTube
                    </a>
                    <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                      <FaPlay /> Preview
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent Videos */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Recent Videos</h3>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={`https://images.unsplash.com/photo-${item === 1 ? '1429962714451-bb934ecdc4ec' : item === 2 ? '1510915361894-db8b60106cb1' : '1415201364774-f6f0bb35f28f'}?auto=format&fit=crop&q=85`}
                          alt="Video thumbnail"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaPlay className="text-white/90" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-[#3b82f6] transition-colors">Video Title {item}</h4>
                        <p className="text-white/60 text-sm">15:30</p>
                      </div>
                      <Link
                        href={`/videos/${item}`}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#3b82f6] hover:text-white transition-all"
                      >
                        <FaPlay />
                      </Link>
                    </div>
                  </div>
                ))}
                
                {/* View All Link */}
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors"
                >
                  View All Videos <FaPlay className="text-sm" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ABOUT_IMAGES.length)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
        <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Image Slideshow */}
            <ImageSlideshow currentIndex={currentImageIndex} />

            {/* Content */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-[#3b82f6]"></div>
                  <h3 className="text-[#3b82f6] uppercase tracking-wider font-medium">Our Story</h3>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Faith Journey & Musical Mission
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-white/80 leading-relaxed">
                    From humble beginnings to spreading God's message through music, my journey has been guided by faith and divine purpose. Each note, each lyric is crafted to touch hearts and uplift spirits.
                  </p>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Through gospel music, we create a bridge between hearts and heaven, bringing hope, healing, and divine love to all who listen.
                  </p>
                </div>
              </motion.div>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaPrayingHands className="text-3xl text-[#3b82f6]" />
                  <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  To spread the message of hope and salvation through the universal language of music, touching hearts and transforming lives one song at a time.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Ministry Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {MINISTRY_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">{stat.number}</h4>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Journey Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/10"></div>
            <div className="space-y-12">
              {JOURNEY_MILESTONES.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2 text-right">
                    <div className={`space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-[#3b82f6] text-xl font-bold">{milestone.year}</h3>
                      <h4 className="text-white text-2xl font-semibold">{milestone.title}</h4>
                      <p className="text-white/60">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-[#3b82f6] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6]/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <MediaSection />

      {/* Events & Bookings Section */}
      <section id="events" className="py-20 bg-gradient-to-b from-[#121212] to-[#1e1e1e]">
        <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-1 bg-[#3b82f6]"></div>
              <h3 className="text-[#3b82f6] uppercase tracking-wider font-medium">Events & Bookings</h3>
              <div className="w-12 h-1 bg-[#3b82f6]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Upcoming Performances
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Experience the power of gospel music live. Join us at our upcoming events or book me for your special occasion.
            </p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#3b82f6] rounded-full text-white text-sm">
                    {event.type}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-xl text-white text-center">
                    <div className="text-sm font-medium">{event.date}</div>
                    <div className="text-xs text-white/80">{event.time}</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-white/60 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-[#3b82f6]" />
                    {event.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-full font-medium hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                View All Events
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/events#booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 group"
              >
                Book Performance
                <FaMusic className="transform group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 