'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaYoutube, FaPlay } from 'react-icons/fa'

const MUSIC_VIDEOS = [
  {
    id: 1,
    title: "Hailing Your Name",
    description: "Official Music Video - A heartfelt worship song glorifying the name of Jesus",
    thumbnail: "/images/jaco_04.jpg",
    duration: "5:00",
    releaseYear: "2020",
    youtubeUrl: "https://www.youtube.com/watch?v=N6zRlhAeBFs",
    views: "10K+"
  }
  // Add more videos as they become available
]

export default function MusicVideos() {
  return (
    <section className="py-12 sm:py-20 bg-black/50">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Music Videos
          </h2>
          <p className="text-white/60 text-lg">Watch our latest worship videos</p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MUSIC_VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
        </div>
      </div>
    </section>
  )
} 