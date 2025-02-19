'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaSpotify, FaApple, FaShare, FaMusic, FaVideo, FaYoutube } from 'react-icons/fa'

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
    <section id="media" className="py-12 sm:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3b82f6] rounded-full opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-[0.07] blur-3xl" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Media & <span className="text-[#3b82f6]">Releases</span>
          </h2>
          <p className="text-white/60 text-lg">Experience our worship through music and videos</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('music')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'music'
                ? 'bg-[#3b82f6] text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <FaMusic className="text-lg" />
            Music
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'videos'
                ? 'bg-[#3b82f6] text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <FaVideo className="text-lg" />
            Videos
          </motion.button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'music' ? (
            // Music Releases
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-4"
            >
              {MEDIA_DATA.music.map((release) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="glass-card overflow-hidden rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={release.image}
                          alt={release.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Song Info */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#3b82f6] transition-colors">
                          {release.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-2">{release.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-white/40">
                            {release.duration}
                          </span>
                          <span className="text-white/40">
                            {release.releaseYear}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleShare(release.title, release.shareUrl)}
                          className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#2563eb]"
                          title="Share Song"
                        >
                          <FaShare size={14} />
                        </button>
                        <a 
                          href={release.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1ed760]"
                          title="Listen on Spotify"
                        >
                          <FaSpotify size={16} />
                        </a>
                        <a 
                          href={release.appleMusic}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-[#FB233B] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff365c]"
                          title="Listen on Apple Music"
                        >
                          <FaApple size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Videos Grid
            <div className="space-y-8">
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {MEDIA_DATA.videos.slice(0, 3).map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="glass-card overflow-hidden rounded-xl">
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-lg hover:bg-[#ff1a1a] transition-colors"
                          >
                            <FaPlay size={24} />
                          </a>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/40">{video.releaseYear}</span>
                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#FF0000] hover:text-[#ff1a1a] transition-colors"
                          >
                            <FaYoutube size={20} />
                            Watch on YouTube
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Watch More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <a
                  href="https://www.youtube.com/@jacoosijaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-full hover:bg-[#ff1a1a] transition-all duration-300"
                >
                  <FaYoutube className="text-xl" />
                  <span>Watch More Videos</span>
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 