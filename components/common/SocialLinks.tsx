'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'
import { SITE_CONFIG } from '@/constants'

// Social Media Links Data
const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    url: SITE_CONFIG.social.youtube,
    hoverColor: 'hover:bg-red-600',
    bgColor: 'bg-red-500/10'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: SITE_CONFIG.social.instagram,
    hoverColor: 'hover:bg-pink-600',
    bgColor: 'bg-pink-500/10'
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: SITE_CONFIG.social.facebook,
    hoverColor: 'hover:bg-blue-600',
    bgColor: 'bg-blue-500/10'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok />,
    url: SITE_CONFIG.social.tiktok,
    hoverColor: 'hover:bg-black',
    bgColor: 'bg-gray-500/10'
  },
  {
    name: 'Spotify',
    icon: <FaSpotify />,
    url: SITE_CONFIG.social.spotify,
    hoverColor: 'hover:bg-green-600',
    bgColor: 'bg-green-500/10'
  }
]

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-col items-center"
    >
      <span className="text-white/60 text-sm mb-4">Connect With Us</span>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {SOCIAL_LINKS.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${social.bgColor} ${social.hoverColor} flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-${social.bgColor}`}
            aria-label={social.name}
          >
            <span className="text-lg sm:text-xl">{social.icon}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
} 