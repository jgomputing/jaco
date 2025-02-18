import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok, FaPlay, FaArrowRight } from 'react-icons/fa'

// Social Media Links with Gradient Colors
const SOCIAL_LINKS = [
  { icon: <FaYoutube />, href: '#', label: 'YouTube', gradient: 'from-red-500 to-red-600' },
  { icon: <FaSpotify />, href: '#', label: 'Spotify', gradient: 'from-green-500 to-green-600' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram', gradient: 'from-purple-500 to-pink-500' },
  { icon: <FaFacebookF />, href: '#', label: 'Facebook', gradient: 'from-blue-500 to-blue-600' },
  { icon: <FaTiktok />, href: '#', label: 'TikTok', gradient: 'from-gray-800 to-black' }
]

// Navigation Links
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Media', href: '/#music' },
  { name: 'Blog', href: '/blog' },
  { name: 'Store', href: '/store' },
  { name: 'Contact', href: '/contact' }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 2xl:px-24 pt-12 sm:pt-20 pb-6 sm:pb-10 relative">
        {/* Upper Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 mb-12 sm:mb-20 pb-12 sm:pb-20 border-b border-white/5">
          {/* Logo and Tagline */}
          <div className="text-center lg:text-left w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-4 sm:gap-6"
            >
              <Link href="/" className="block group">
                <div className="relative transform transition-all duration-500 hover:scale-105">
                  <Image
                    src="/images/logo/main_logo.png"
                    alt="JACO MUSICAL"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#3b82f6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Spreading Gospel Through <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-transparent bg-clip-text">Music & Worship</span>
              </h2>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-auto max-w-md"
          >
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3b82f6]/5 to-transparent opacity-20" />
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Stay Connected</h3>
                <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">Join our newsletter for updates and inspiration</p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/10 hover:border-white/20 text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="group px-4 sm:px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-500 flex items-center justify-center gap-2 hover:gap-3 text-sm sm:text-base whitespace-nowrap"
                  >
                    Subscribe <FaArrowRight className="transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold text-white mb-6 sm:mb-8 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#2563eb]"></div>
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-[#3b82f6] transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <Link 
              href="/#music"
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md block p-4 sm:p-8 rounded-2xl hover:border-white/20 transition-all duration-500 border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center gap-3">
                  Listen Now 
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-500">
                    <FaPlay className="text-sm transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </h3>
                <p className="text-white/60 text-sm sm:text-base">
                  Experience our latest worship songs and performances
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold text-white mb-6 sm:mb-8 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#2563eb]"></div>
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-500 relative overflow-hidden`}
                  whileHover={{ y: -5 }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative text-sm sm:text-base">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center relative"
        >
          <p className="text-white/40 text-xs sm:text-sm">
            © {new Date().getFullYear()} JACO MUSICAL. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 