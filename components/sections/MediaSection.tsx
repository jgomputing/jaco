'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaYoutube, FaSpotify, FaApple, FaShare, FaPlay } from 'react-icons/fa'

// This type definition will help with admin panel integration
type MediaItem = {
  id: string
  type: 'video' | 'music'
  title: string
  description: string
  thumbnail: string
  date: string
  duration: string
  platforms: {
    youtube?: string
    spotify?: string
    appleMusic?: string
  }
}

// Sample data - will be replaced with data from admin panel
const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    title: 'I Cannot Fail',
    description: 'Official Music Video - An anthem of faith and perseverance',
    thumbnail: '/images/jaco_03.jpg',
    date: 'February 28, 2024',
    duration: '4:15',
    platforms: {
      youtube: 'https://youtu.be/_Og9mSPsMX4'
    }
  },
  {
    id: '2',
    type: 'music',
    title: 'Follow Jesus',
    description: 'A powerful worship song spreading the message of following Christ',
    thumbnail: '/images/jaco_02.jpg',
    date: 'February 25, 2024',
    duration: '3:42',
    platforms: {
      spotify: 'https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu',
      appleMusic: 'https://www.shazam.com/applemusic/song/1611718813'
    }
  },
  {
    id: '3',
    type: 'music',
    title: 'Hailing Your Name',
    description: 'A heartfelt worship song glorifying the name of Jesus',
    thumbnail: '/images/jaco_04.jpg',
    date: 'February 20, 2024',
    duration: '5:00',
    platforms: {
      spotify: 'https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu',
      appleMusic: 'https://www.shazam.com/applemusic/song/1611718813'
    }
  },
  {
    id: '4',
    type: 'music',
    title: 'Grace Unlimited',
    description: 'An uplifting song celebrating God\'s boundless grace',
    thumbnail: '/images/jaco_01.jpg',
    date: 'February 15, 2024',
    duration: '4:30',
    platforms: {
      spotify: 'https://open.spotify.com/track/49ylqzlFZwGSgRRuFOdbgu',
      appleMusic: 'https://www.shazam.com/applemusic/song/1611718813'
    }
  }
]

// Add YouTube channel URL to the top with other constants
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@jacoosijaye'

export default function MediaSection() {
  const [activeType, setActiveType] = useState<'video' | 'music'>('video')

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

  const filteredMedia = mediaItems.filter(item => item.type === activeType)

  return (
    <section id="media" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Media & <span className="text-[#3b82f6]">Releases</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Watch our latest videos and listen to our music on your favorite platforms.
          </p>
        </motion.div>

        {/* Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveType('video')}
            className={`px-6 py-2 rounded-xl border ${
              activeType === 'video'
                ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                : 'border-[#3b82f6]/20 text-white/60 hover:border-[#3b82f6] hover:text-white'
            } transition-all duration-300`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveType('music')}
            className={`px-6 py-2 rounded-xl border ${
              activeType === 'music'
                ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                : 'border-[#3b82f6]/20 text-white/60 hover:border-[#3b82f6] hover:text-white'
            } transition-all duration-300`}
          >
            Music
          </button>
        </motion.div>

        {/* Media List */}
        <div className={activeType === 'video' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredMedia.slice(0, activeType === 'music' ? 3 : undefined).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#3b82f6]/10 via-purple-500/5 to-transparent p-4 rounded-2xl border border-[#3b82f6]/20"
            >
              {activeType === 'video' ? (
                // Video Layout
                <>
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                          <Image
                      src={item.thumbnail}
                      alt={item.title}
                            fill
                            className="object-cover"
                          />
                    <a
                      href={item.platforms.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPlay className="w-5 h-5 text-white" />
                          </div>
                    </a>
                        </div>

                        {/* Content */}
                          <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#3b82f6] text-sm">{item.date}</span>
                      <span className="text-white/40 text-sm">{item.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                      {item.title}
                            </h3>
                    <p className="text-white/60 mb-4 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    {/* Platform Links */}
                    <div className="flex items-center gap-4">
                      <a
                        href={item.platforms.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                        className="text-[#FF0000] hover:text-[#FF0000]/80 transition-colors"
                      >
                        <FaYoutube className="w-6 h-6" />
                      </a>
                      <button
                        onClick={() => handleShare(item.title, item.platforms.youtube || '')}
                        className="text-white/60 hover:text-white transition-colors ml-auto"
                      >
                        <FaShare className="w-5 h-5" />
                      </button>
                    </div>
              </div>
                </>
              ) : (
                // Music Layout
                <div className="flex gap-6">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#3b82f6] text-sm">{item.date}</span>
                      <span className="text-white/40 text-sm">{item.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 mb-3 text-sm">
                      {item.description}
                    </p>

                    {/* Platform Links */}
                    <div className="flex items-center gap-4">
                      {item.platforms.spotify && (
                        <a
                          href={item.platforms.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                          className="text-[#1DB954] hover:text-[#1DB954]/80 transition-colors"
                        >
                          <FaSpotify className="w-6 h-6" />
                        </a>
                      )}
                      {item.platforms.appleMusic && (
                        <a
                          href={item.platforms.appleMusic}
                            target="_blank"
                            rel="noopener noreferrer"
                          className="text-white hover:text-white/80 transition-colors"
                        >
                          <FaApple className="w-6 h-6" />
                        </a>
                      )}
                      <button
                        onClick={() => handleShare(item.title, item.platforms.spotify || item.platforms.appleMusic || '')}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <FaShare className="w-5 h-5" />
                      </button>
                        </div>
                      </div>
                    </div>
              )}
                  </motion.div>
                ))}
              </div>

        {/* YouTube Channel Link - Only show for videos */}
        {activeType === 'video' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-6 flex justify-center"
          >
            <a
              href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <FaYoutube className="w-6 h-6" />
              <span className="font-medium">View More Videos</span>
            </a>
            </motion.div>
          )}
      </div>
    </section>
  )
} 