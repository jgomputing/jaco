'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaSpotify, FaApple, FaShare, FaMusic, FaVideo, FaYoutube, FaArrowRight } from 'react-icons/fa'

// Combined Media Data
const MEDIA_DATA = {
  music: [
    {
      id: 1,
      title: "Follow Jesus",
      description: "A powerful worship song spreading the message of following Christ",
      image: "/images/jaco_02.jpg",
      duration: "3:42",
      releaseYear: "2022",
      type: "Single",
      appleMusic: "https://www.shazam.com/applemusic/song/1611718813",
      spotify: "https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu?si=94bf0871915a4678",
      shareUrl: "https://jacomusical.com/music/follow-jesus",
      youtubeUrl: "https://youtu.be/COjFbtkvBFM?si=sVTqCHrmcZfsyF_k"
    },
    {
      id: 2,
      title: "I Cannot Fail",
      description: "An inspiring anthem of faith and perseverance",
      image: "/images/jaco_03.jpg",
      duration: "4:48",
      type: "Single",
      releaseYear: "2024",
      appleMusic: "https://www.shazam.com/applemusic/song/1748032504",
      spotify: "https://open.spotify.com/track/4GdivvSLawVabPs92ak5BG?si=23d7cdbf5d954993",
      shareUrl: "https://jacomusical.com/music/i-cannot-fail",
      youtubeUrl: "https://youtu.be/_Og9mSPsMX4?si=tNzSxzKcv8z9n7aw",
      plays: "10,317"
    },
    {
      id: 3,
      title: "Hailing Your Name",
      description: "A heartfelt worship song glorifying the name of Jesus",
      image: "/images/jaco_04.jpg",
      duration: "5:00",
      type: "Single",
      releaseYear: "2020",
      appleMusic: "https://www.shazam.com/applemusic/song/1611718813",
      spotify: "https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu?si=94bf0871915a4678",
      shareUrl: "https://jacomusical.com/music/hailing-your-name",
      youtubeUrl: "https://youtu.be/xeIN2_CA400?si=jSojQqh2ePBV6d6L"
    }
  ],
  videos: [
    {
      id: 1,
      title: "I Cannot Fail",
      description: "Official Music Video - An anthem of faith and perseverance",
      thumbnail: "/images/jaco_03.jpg",
      duration: "4:15",
      releaseYear: "2024",
      youtubeUrl: "https://youtu.be/_Og9mSPsMX4?si=tNzSxzKcv8z9n7aw",
      views: "8K+"
    },
    {
      id: 2,
      title: "Follow Jesus",
      description: "Live Performance - Experience the power of worship",
      thumbnail: "/images/jaco_02.jpg",
      duration: "3:42",
      releaseYear: "2022",
      youtubeUrl: "https://youtu.be/COjFbtkvBFM?si=sVTqCHrmcZfsyF_k",
      views: "5K+"
    },
    {
      id: 3,
      title: "Hailing Your Name",
      description: "Official Music Video - A heartfelt worship song glorifying the name of Jesus",
      thumbnail: "/images/jaco_04.jpg",
      duration: "5:00",
      releaseYear: "2020",
      youtubeUrl: "https://youtu.be/xeIN2_CA400?si=jSojQqh2ePBV6d6L",
      views: "10K+"
    },
    {
      id: 4,
      title: "Divine Worship",
      description: "Live Worship Session - Intimate moments of praise",
      thumbnail: "/images/jaco_04.jpg",
      duration: "6:30",
      releaseYear: "2023",
      youtubeUrl: "https://youtu.be/tASwgoTURS4?si=dREd3Meq8wDt8nwB",
      views: "7K+"
    }
  ]
}

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState<'music' | 'videos'>('music')

  const handleShare = async (title: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Listen to ${title} by Jaco Osijaye`,
          url: url
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(url, '_blank')
    }
  }

  return (
    <section id="media" className="py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Modern mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-purple-600/5 to-transparent" />
        
        {/* Subtle animated accent */}
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-[#3b82f6]/10 to-transparent blur-3xl opacity-40 animate-pulse-slow" />
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 backdrop-blur-[100px] bg-black/20" />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="text-white/60 text-sm font-medium">Latest Releases</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Media & <span className="text-[#3b82f6]">Releases</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Experience our worship through music and videos</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-3 mb-16">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('music')}
            className={`btn ${activeTab === 'music' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <div className="btn-content">
              <div className="btn-icon">
                <FaMusic className="text-lg" />
              </div>
              <span>Music</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('videos')}
            className={`btn ${activeTab === 'videos' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <div className="btn-content">
              <div className="btn-icon">
                <FaVideo className="text-lg" />
              </div>
              <span>Videos</span>
            </div>
          </motion.button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'music' ? (
            // Music Releases List
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 gap-4">
                {MEDIA_DATA.music.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/20 via-purple-600/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                    <div className="bg-white/[0.03] backdrop-blur-xl rounded-xl overflow-hidden hover:bg-white/[0.05] transition-all duration-500 border border-white/[0.05]">
                      <div className="flex items-center">
                        {/* Album Art */}
                        <div className="relative h-20 w-20 shrink-0">
                          <Image
                            src={release.image}
                            alt={release.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg"
                            >
                              <FaPlay size={16} />
                            </motion.button>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-between px-4 py-3">
                          <div>
                            <h3 className="text-base font-bold text-white group-hover:text-[#3b82f6] transition-colors line-clamp-1">
                              {release.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-white/40">{release.duration}</span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-xs text-white/40">{release.releaseYear}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={release.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-spotify p-2"
                            >
                              <FaSpotify className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={release.appleMusic}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-apple p-2"
                            >
                              <FaApple className="w-4 h-4" />
                            </motion.a>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleShare(release.title, release.shareUrl)}
                              className="btn btn-secondary p-2"
                            >
                              <FaShare className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Videos Grid with max 3 columns
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12 max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {MEDIA_DATA.videos.slice(0, 3).map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 border border-white/10 h-full flex flex-col">
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Play Button */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                        >
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-lg hover:bg-[#ff1a1a] transition-colors"
                          >
                            <FaPlay size={24} />
                          </a>
                        </motion.div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                          {video.duration}
                        </div>

                        {/* Views Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                          {video.views}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#FF0000] transition-colors mb-2">
                          {video.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                          <span className="text-white/40 text-sm">{video.releaseYear}</span>
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#FF0000] hover:text-[#ff1a1a] transition-colors group/link"
                          >
                            <FaYoutube size={20} />
                            <span className="text-sm font-medium group-hover/link:underline">Watch</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Watch More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.youtube.com/@jacoosijaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-youtube"
                >
                  <div className="btn-glow" />
                  <div className="btn-content">
                    <FaYoutube className="text-2xl" />
                    <span className="font-medium">Visit YouTube Channel</span>
                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 