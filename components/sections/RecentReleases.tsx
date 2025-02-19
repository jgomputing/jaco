'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPlay, FaSpotify, FaApple, FaShare } from 'react-icons/fa'

// Sample Recent Releases Data
const RECENT_RELEASES = [
  {
    id: 1,
    title: "Follow Jesus",
    description: "A powerful worship song spreading the message of following Christ",
    image: "/images/jaco_02.jpg",
    duration: "3:42",
    releaseYear: "2022",
    type: "Single",
    appleMusic: "https://www.shazam.com/applemusic/song/1611718813",
    spotify: "https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu?si=Fdey_FurT-WeIaVsKuP9cw",
    shareUrl: "https://jacomusical.com/music/follow-jesus"
  },
  {
    id: 2,
    title: "I Cannot Fail",
    description: "An inspiring anthem of faith and perseverance",
    image: "/images/jaco_03.jpg",
    duration: "4:15",
    type: "Single",
    releaseYear: "2024",
    appleMusic: "https://www.shazam.com/applemusic/song/1748032504",
    spotify: "#",
    shareUrl: "https://jacomusical.com/music/i-cannot-fail",
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
    spotify: "#",
    shareUrl: "https://jacomusical.com/music/hailing-your-name"
  }
]

export default function RecentReleases() {
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
          <p className="text-white/60 text-lg">Experience our latest worship songs</p>
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
            Experience Our Music
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 