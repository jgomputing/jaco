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
          <div className="pt-32 sm:pt-0 flex-1 flex items-center">
            <div className="max-w-6xl">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] tracking-tight max-w-4xl">
                  <span className="block mb-1 sm:mb-2">Spreading</span>
                  <span className="block text-[#3b82f6]">God's Love Through Music</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mt-1.5 sm:mt-6"
              >
                <p className="text-base sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  Join JACO OSIJAYE on a spiritual journey through gospel music. Available for church events, gospel concerts, and special occasions.
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-1.5 sm:mt-6 max-w-2xl"
              >
                <blockquote className="text-base sm:text-xl italic text-white/90 border-l-2 border-[#3b82f6] pl-4 sm:pl-6 leading-relaxed">
                  "With every word I speak, I magnify God's glory—igniting a revolution of hope that awakens nations and transforms lives worldwide."
                </blockquote>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-6 sm:mt-8 w-full sm:w-auto"
              >
                <Link 
                  href="/videos"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-all duration-300 rounded-xl relative overflow-hidden"
                >
                  <div className="relative flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                      <FaVideo className="text-sm sm:text-base" />
                    </div>
                    <span className="font-medium">Watch Our Videos</span>
                  </div>
                </Link>
                <Link 
                  href="/#music"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] bg-white/[0.02] hover:bg-white/[0.05] text-white border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl"
                >
                  <div className="relative flex items-center gap-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                      <FaMusic className="text-sm sm:text-base" />
                    </div>
                    <span className="font-medium">Listen Now</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 sm:mt-8 pb-2 sm:pb-8">
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
                  className="flex flex-col items-center gap-0.5 sm:gap-1"
                >
                  <FaChevronDown className="text-white/60 text-sm sm:text-xl" />
                  <FaChevronDown className="text-white/40 text-sm sm:text-xl -mt-1.5 sm:-mt-2" />
                  <span className="text-white/60 text-[10px] sm:text-sm">Scroll Down</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 