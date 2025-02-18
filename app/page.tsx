'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaBlog, FaEnvelope, FaBars, FaTimes, FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok, FaHeart, FaCross, FaPrayingHands, FaChurch, FaPlay, FaArrowRight, FaMapMarkerAlt, FaVideo } from 'react-icons/fa'
import RecentReleases from '@/components/sections/RecentReleases'
import MediaSection from '@/components/sections/Media'

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
    title: "Jaco Osijaye",
    subtitle: "Transforming Lives Through Gospel Music & Worship"
  },
  {
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85',
    title: "Book Your Event",
    subtitle: "Experience the power of worship with Jaco Osijaye"
  },
  {
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85',
    title: "Latest Releases",
    subtitle: "Discover Jaco's newest gospel songs and performances"
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
      <div className="absolute inset-0 z-10 flex flex-col justify-between pt-32 sm:pt-40 pb-8">
        <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
          <div className="max-w-6xl space-y-8 md:space-y-12">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] tracking-tight">
                <span className="block mb-2">Spreading</span>
                <span className="block text-[#3b82f6]">God's Love Through Music</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                Join JACO MUSICAL on a spiritual journey through gospel music. Available for church events, gospel concerts, and special occasions.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link
                href="/events#booking"
                className="btn-primary inline-flex items-center gap-3 text-base sm:text-lg px-8 py-4 rounded-full"
              >
                Book for Your Event <FaMusic className="text-xl" />
              </Link>
              <Link
                href="/#music"
                className="btn-secondary inline-flex items-center gap-3 text-base sm:text-lg px-8 py-4 rounded-full"
              >
                Listen to Music <FaPlay className="text-sm" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {HERO_SLIDES.map((_, index) => (
            <motion.button
              key={index}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-2 bg-[#3b82f6]' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
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
      className="relative aspect-square rounded-2xl overflow-hidden group perspective bg-black/20 backdrop-blur-sm border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src={ABOUT_IMAGES[currentIndex].src}
            alt={ABOUT_IMAGES[currentIndex].alt}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
        {/* Top Content */}
        <div className="w-full">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3b82f6]/20 backdrop-blur-sm rounded-full text-[#3b82f6] text-sm font-medium"
          >
            <div className="w-1 h-1 rounded-full bg-[#3b82f6]" />
            Featured
          </motion.span>
        </div>

        {/* Bottom Content */}
        <div className="space-y-8">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {ABOUT_IMAGES[currentIndex].caption}
            </h3>
            <p className="text-white/80 text-base sm:text-lg max-w-md">
              {ABOUT_IMAGES[currentIndex].description}
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`flex items-center justify-between transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {ABOUT_IMAGES.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer
                    ${index === currentIndex ? 'w-8 bg-[#3b82f6]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
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
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3b82f6]/10 to-transparent opacity-20" />
                
                <div className="relative">
                  {/* Header */}
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#3b82f6]/10 rounded-full mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    <h3 className="text-[#3b82f6] uppercase tracking-wider text-sm font-medium">Our Story</h3>
                  </div>

                  {/* Title and Content */}
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                    Faith Journey & Musical Mission
                  </h2>

                  <div className="space-y-4">
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                      From humble beginnings to spreading God's message through music, Jaco Osijaye's journey has been guided by faith and divine purpose. Each note, each lyric is crafted to touch hearts and uplift spirits in praise of the Almighty.
                    </p>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                      Through gospel music, Jaco Osijaye creates a bridge between hearts and heaven, bringing hope, healing, and divine love to all who listen. His ministry continues to transform lives through the power of worship.
                    </p>
                  </div>

                  {/* Mission Statement - Now integrated into main card */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center">
                        <FaPrayingHands className="text-xl text-[#3b82f6]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                      To spread the message of hope and salvation through the universal language of music, touching hearts and transforming lives one song at a time.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
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
              Upcoming Events
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Experience the power of gospel music and ministry live. Join us at our upcoming events or book us for your special occasion.
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