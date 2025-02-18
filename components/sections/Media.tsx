import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaSpotify, FaYoutube, FaMusic, FaVideo, FaArrowRight } from 'react-icons/fa'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

// Sample Music Data
const FEATURED_MUSIC = [
  {
    id: 1,
    title: "Divine Love",
    duration: "4:35",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    spotifyUrl: "#",
    isNew: true
  },
  {
    id: 2,
    title: "Amazing Grace",
    duration: "5:20",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    spotifyUrl: "#"
  },
  {
    id: 3,
    title: "Glorious Day",
    duration: "4:15",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    spotifyUrl: "#"
  }
]

// Sample Videos Data
const FEATURED_VIDEOS = [
  {
    id: 1,
    title: "Live Worship Session",
    duration: "15:30",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    youtubeUrl: "#",
    isNew: true
  },
  {
    id: 2,
    title: "Gospel Concert Highlights",
    duration: "8:45",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    youtubeUrl: "#"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    duration: "12:20",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    youtubeUrl: "#"
  }
]

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState('music')

  return (
    <section id="music" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:sticky lg:top-32"
          >
            <div className="relative bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3b82f6]/5 to-transparent opacity-20" />
              
              <div className="relative">
                {/* Header */}
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#3b82f6]/10 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-[#3b82f6] uppercase tracking-wider text-sm font-medium">Experience Our Music</span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-6">
                  Immerse Yourself in 
                  <span className="text-[#3b82f6]"> Worship</span>
                </h2>

                <div className="space-y-6">
                  <p className="text-lg text-white/70 leading-relaxed">
                    Discover our collection of worship and gospel music. Listen, share, and connect with God through melody.
                  </p>

                  {/* Tab Navigation */}
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-2 rounded-2xl flex flex-col sm:flex-row items-stretch w-full max-w-xs gap-2 border border-white/10">
                    <button
                      onClick={() => setActiveTab('music')}
                      className={`flex-1 flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-500 ${
                        activeTab === 'music'
                          ? 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white shadow-lg scale-[1.02]'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${activeTab === 'music' ? 'bg-white/20' : 'bg-white/5'} transition-colors duration-500`}>
                        <FaMusic className="text-base" />
                      </div>
                      <span>Music</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('videos')}
                      className={`flex-1 flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-500 ${
                        activeTab === 'videos'
                          ? 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white shadow-lg scale-[1.02]'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${activeTab === 'videos' ? 'bg-white/20' : 'bg-white/5'} transition-colors duration-500`}>
                        <FaVideo className="text-base" />
                      </div>
                      <span>Videos</span>
                    </button>
                  </div>

                  {/* Action Button */}
                  <div className="w-full">
                    <Link
                      href={activeTab === 'music' ? "/music" : "/videos"}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-medium hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-500 shadow-lg hover:shadow-[#3b82f6]/25 hover:scale-[1.02] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <div className="relative flex items-center gap-3">
                        {activeTab === 'music' ? (
                          <>
                            <div className="p-2 bg-white/20 rounded-lg">
                              <FaMusic className="text-base" />
                            </div>
                            <span className="text-sm sm:text-base">Browse Music Library</span>
                          </>
                        ) : (
                          <>
                            <div className="p-2 bg-white/20 rounded-lg">
                              <FaVideo className="text-base" />
                            </div>
                            <span className="text-sm sm:text-base">Watch More Videos</span>
                          </>
                        )}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>

                  {/* Media Item Buttons */}
                  <style jsx global>{`
                    .media-action-btn {
                      position: relative;
                      overflow: hidden;
                    }
                    .media-action-btn::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
                      transform: translateX(-100%);
                      transition: transform 0.5s ease;
                    }
                    .media-action-btn:hover::after {
                      transform: translateX(100%);
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Media List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'music' ? (
                <motion.div
                  key="music-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {FEATURED_MUSIC.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-[#3b82f6] transition-colors truncate">
                              {item.title}
                            </h3>
                            {item.isNew && (
                              <span className="px-2 py-1 bg-[#3b82f6] rounded-full text-xs font-medium text-white">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 text-sm">{item.duration}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <a
                            href={item.spotifyUrl}
                            className="media-action-btn p-2.5 sm:p-3.5 rounded-xl bg-[#1DB954] text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-90 hover:scale-110 hover:shadow-lg hover:shadow-[#1DB954]/25"
                            aria-label="Listen on Spotify"
                          >
                            <FaSpotify className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                          <button 
                            className="media-action-btn p-2.5 sm:p-3.5 rounded-xl bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 hover:shadow-lg"
                            aria-label="Play"
                          >
                            <FaPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="videos-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {FEATURED_VIDEOS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <FaPlay className="text-white text-2xl" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-[#3b82f6] transition-colors truncate">
                              {item.title}
                            </h3>
                            {item.isNew && (
                              <span className="px-2 py-1 bg-[#3b82f6] rounded-full text-xs font-medium text-white">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 text-sm">{item.duration}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <a
                            href={item.youtubeUrl}
                            className="media-action-btn p-2.5 sm:p-3.5 rounded-xl bg-[#FF0000] text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-opacity-90 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/25"
                            aria-label="Watch on YouTube"
                          >
                            <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  )
} 