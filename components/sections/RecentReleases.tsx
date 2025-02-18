import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPlay, FaSpotify, FaYoutube, FaDownload } from 'react-icons/fa'

// Sample Recent Releases Data
const RECENT_RELEASES = [
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

export default function RecentReleases() {
  return (
    <section className="py-12 sm:py-20">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Recent Releases
          </h2>
          <p className="text-white/60 text-lg">Download and listen to our latest worship songs</p>
        </motion.div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 gap-4">
          {RECENT_RELEASES.map((release) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                    <span className="text-white/40 text-sm">
                      {release.duration}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a 
                      href={release.downloadUrl}
                      className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#2563eb]"
                      title="Download Song"
                    >
                      <FaDownload size={14} />
                    </a>
                    <button 
                      className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#2563eb]"
                      title="Play Song"
                    >
                      <FaPlay size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/music"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-full hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg group text-sm"
          >
            <FaPlay className="text-xs group-hover:translate-x-1 transition-transform" />
            View All Releases
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 