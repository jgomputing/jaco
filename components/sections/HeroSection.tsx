'use client'

import React from 'react'
import HeroSlider from '@/components/common/HeroSlider'
import Button from '@/components/common/Button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaMusic, FaVideo, FaChevronDown, FaHeart } from 'react-icons/fa'

export default function HeroSection() {
  return (
    <section className="relative min-h-[75vh] w-full overflow-hidden">
      <HeroSlider />
      
      {/* Main Content */}
      <div className="absolute inset-0 z-10">
        {/* Hero Content */}
        <div className="container h-full flex flex-col">
          <div className="pt-20 sm:pt-32 flex-1 flex items-center">
            <div className="max-w-6xl">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] sm:leading-[1.2] tracking-tight max-w-4xl">
                  <span className="block mb-0 sm:mb-0.5">Spreading</span>
                  <span className="block text-[#3b82f6]">God's Love Through Music</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mt-2 sm:mt-4"
              >
                <p className="text-sm sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
                  Join JACO OSIJAYE on a spiritual journey through gospel music. Delivering the Worship Message– Ready to Serve
                </p>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-2 sm:mt-4 max-w-2xl"
              >
                <blockquote className="text-xs sm:text-base md:text-lg italic text-white/90 border-l-2 border-[#3b82f6] pl-2 sm:pl-4 leading-relaxed">
                  "With every word I speak, I magnify God's glory—igniting a revolution of hope that awakens nations and transforms lives worldwide."
                </blockquote>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-6 max-w-[280px] sm:max-w-none mx-auto sm:mx-0"
              >
                <Link 
                  href="/videos"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-all duration-300 rounded-xl relative overflow-hidden"
                >
                  <div className="relative flex items-center gap-1.5 sm:gap-2">
                    <div className="p-1 sm:p-1.5 bg-white/20 rounded-lg">
                      <FaVideo className="text-xs sm:text-base" />
                    </div>
                    <span className="font-medium">Watch Our Videos</span>
                  </div>
                </Link>
                <Link 
                  href="/#music"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] bg-white/[0.02] hover:bg-white/[0.05] text-white border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl"
                >
                  <div className="relative flex items-center gap-1.5 sm:gap-2">
                    <div className="p-1 sm:p-1.5 bg-white/10 rounded-lg">
                      <FaMusic className="text-xs sm:text-base" />
                    </div>
                    <span className="font-medium">Listen Now</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:hidden z-20">
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
              className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer group bg-black/20 backdrop-blur-sm p-2 rounded-xl"
            >
              {/* Chevrons */}
              <div className="flex flex-col items-center">
                <FaChevronDown className="text-white text-sm" />
                <FaChevronDown className="text-white/60 text-sm -mt-1" />
              </div>
              <span className="text-white text-[10px] font-medium tracking-wider uppercase">Scroll Down</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 