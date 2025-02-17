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
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24 pt-20 pb-10">
        {/* Upper Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 pb-20 border-b border-white/5">
          {/* Logo and Tagline */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-6"
            >
              <Link href="/" className="block">
                <Image
                  src="/images/logo/main_logo.png"
                  alt="JACO MUSICAL"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </Link>
              <h2 className="text-2xl font-bold text-white">
                Spreading Gospel Through <span className="text-[#3b82f6]">Music & Worship</span>
              </h2>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-auto"
          >
            <div className="glass-card p-8 max-w-md mx-auto lg:mx-0">
              <h3 className="text-xl font-semibold text-white mb-2">Stay Connected</h3>
              <p className="text-white/60 mb-6">Join our newsletter for updates and inspiration</p>
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/5 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
                >
                  Subscribe <FaArrowRight className="text-sm" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#3b82f6]"></span>
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/60 hover:text-[#3b82f6] transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
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
              className="glass-card block p-8 group hover:bg-[#3b82f6]/5"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                Listen Now <FaPlay className="text-sm group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-white/60">
                Experience our latest worship songs and performances
              </p>
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
            <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#3b82f6]"></span>
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300`}
                  whileHover={{ y: -5 }}
                  aria-label={social.label}
                >
                  {social.icon}
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
          className="text-center"
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} JACO MUSICAL. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 