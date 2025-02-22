'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaYoutube, FaInstagram, FaFacebook, FaTiktok, FaArrowRight } from 'react-icons/fa'

const QUICK_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Music', href: '/#media' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/#contact' }
]

const SOCIAL_LINKS = [
  { 
    icon: FaYoutube, 
    href: 'https://youtube.com/@jacoosijaye', 
    label: 'YouTube',
    color: 'group-hover:bg-red-600',
    hoverText: 'group-hover:text-red-600'
  },
  { 
    icon: FaInstagram, 
    href: 'https://instagram.com/jacoosijaye', 
    label: 'Instagram',
    color: 'group-hover:bg-pink-600',
    hoverText: 'group-hover:text-pink-600'
  },
  { 
    icon: FaFacebook, 
    href: 'https://facebook.com/jacoosijaye', 
    label: 'Facebook',
    color: 'group-hover:bg-blue-600',
    hoverText: 'group-hover:text-blue-600'
  },
  { 
    icon: FaTiktok, 
    href: 'https://tiktok.com/@jacoosijaye', 
    label: 'TikTok',
    color: 'group-hover:bg-black',
    hoverText: 'group-hover:text-black'
  }
]

export default function FooterSection() {
  return (
    <footer className="relative bg-[#0f1729] border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="container py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Through Music & Worship
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Join us on a spiritual journey through gospel music and worship.
            </p>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.label}
                >
                  <div className="relative overflow-hidden rounded-lg bg-white/5 w-8 h-8 flex items-center justify-center transition-colors duration-300">
                    <social.icon 
                      size={16} 
                      className={`text-white/70 transition-all duration-300 group-hover:text-white group-hover:scale-110 ${social.hoverText}`}
                    />
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${social.color}`} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Jaco Musical. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 