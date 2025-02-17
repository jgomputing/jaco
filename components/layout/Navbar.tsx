'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaBlog, FaEnvelope, FaBars, FaTimes, FaYoutube, FaSpotify, FaInstagram, FaHeart, FaVideo, FaStore } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

// Navigation Links
const NAVIGATION_LINKS = [
  { name: 'About', path: '/#about' },
  { name: 'Media', path: '/#music' },
  { name: 'Blog', path: '/blog' },
  { name: 'Store', path: '/store' },
  { name: 'Contact', path: '/contact' }
]

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault()
      const targetId = path.replace('/#', '')
      const targetElement = document.getElementById(targetId)
      
      if (targetElement && pathname === '/') {
        const navbarHeight = 80
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
        
        setIsMobileMenuOpen(false)
      } else if (pathname !== '/') {
        window.location.href = path
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-xl py-3 border-b border-white/10' 
          : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent py-5'
      }`}>
        <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <div className={`relative transition-all duration-500 hover:scale-105 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}>
                <Image
                  src="/images/logo/main_logo.png"
                  alt="JACO MUSICAL"
                  width={100}
                  height={100}
                  className="rounded-full"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`flex items-center gap-2 font-medium text-base transition-all duration-300 relative group ${
                    isScrolled ? 'text-white hover:text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name === 'About' && <FaHeart className="text-lg" />}
                    {link.name === 'Media' && <FaVideo className="text-lg" />}
                    {link.name === 'Blog' && <FaBlog className="text-lg" />}
                    {link.name === 'Store' && <FaStore className="text-lg" />}
                    {link.name === 'Contact' && <FaEnvelope className="text-lg" />}
                    {link.name}
                  </span>
                  <div className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    isScrolled ? 'bg-[#3b82f6]' : 'bg-white'
                  }`}></div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-3 rounded-lg transition-all duration-500 ${
                isScrolled ? 'text-white hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white'
              }`}
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-4 right-4 w-[280px] bg-gradient-to-b from-[#3b82f6]/95 to-[#2563eb]/95 backdrop-blur-md z-50 md:hidden rounded-2xl shadow-xl"
            >
              <div className="flex flex-col">
                {/* Close Button Only */}
                <div className="flex items-center justify-end p-4 border-b border-white/10">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="py-4 px-4">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.path}
                        onClick={(e) => {
                          handleNavClick(e, link.path)
                          setIsMobileMenuOpen(false)
                        }}
                        className="py-3 text-base text-white/90 hover:text-white flex items-center gap-3 group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          {link.name === 'About' && <FaHeart size={14} />}
                          {link.name === 'Media' && <FaVideo size={14} />}
                          {link.name === 'Blog' && <FaBlog size={14} />}
                          {link.name === 'Store' && <FaStore size={14} />}
                          {link.name === 'Contact' && <FaEnvelope size={14} />}
                        </span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="p-4 border-t border-white/10">
                  <p className="text-white/60 text-xs mb-3">Follow Us</p>
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                      <FaYoutube size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                      <FaSpotify size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors">
                      <FaInstagram size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 