'use client'

import React from 'react'
import HeroSlider from '@/components/common/HeroSlider'
import Button from '@/components/common/Button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaMusic, FaVideo, FaChevronDown } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <HeroSlider />
      
      {/* Main Content */}
      <div className="absolute inset-0 z-10">
        {/* Hero Content */}
        <div className="container h-full flex flex-col">
          <div className="flex-1 pt-32 sm:pt-40">
            <div className="max-w-6xl">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] tracking-tight max-w-4xl">
                  <span className="block mb-2">Spreading</span>
                  <span className="block text-[#3b82f6]">God's Love Through Music</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mt-8"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  Join JACO OSIJAYE on a spiritual journey through gospel music. Available for church events, gospel concerts, and special occasions.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 max-w-[280px] sm:max-w-none mx-auto sm:mx-0"
              >
                <Link 
                  href="/videos"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white shadow-lg hover:shadow-xl hover:shadow-[#3b82f6]/25 transition-all duration-500 rounded-full relative overflow-hidden hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                      <FaVideo className="text-base sm:text-xl" />
                    </div>
                    <span>Watch Our Videos</span>
                  </div>
                </Link>
                <Link 
                  href="/#music"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-500 rounded-full relative overflow-hidden hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-500">
                      <FaMusic className="text-base sm:text-xl" />
                    </div>
                    <span>Listen Now</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full py-8 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                {/* Scroll Indicator */}
                <motion.div
                  animate={{ 
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <FaChevronDown className="text-white/60 text-xl" />
                  <FaChevronDown className="text-white/40 text-xl -mt-3" />
                  <span className="text-white/60 text-sm mt-1">Scroll Down</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 