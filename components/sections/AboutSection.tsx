'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaMusic, FaPrayingHands, FaChurch, FaMicrophone, FaGlobe, FaQuoteLeft, FaAward, FaArrowRight, FaTimes } from 'react-icons/fa'

// Stats Data
const MINISTRY_STATS = [
  { label: 'Years in Ministry', value: '10+' },
  { label: 'Albums Released', value: '2+' },
  { label: 'Live Performances', value: '200+' },
  { label: 'Countries Reached', value: '5+' }
]

// Image Slider Data
const SLIDER_IMAGES = [
  {
    url: "/images/jaco_02.jpg",
    title: "Jaco Osijaye",
    subtitle: "Gospel Artist & Minister"
  },
  {
    url: "/images/jaco_05.jpg",
    title: "Worship Leader",
    subtitle: "Touching Lives Through Music"
  },
  {
    url: "/images/jaco_04.jpg",
    title: "Music Minister",
    subtitle: "Coordinator of Worship Community UAE"
  }
]

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="about" className="relative py-20 scroll-mt-20">
      <div className="container">
        {/* Enhanced Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent" />
          <div className="text-center max-w-3xl mx-auto px-4 pt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
              <span className="text-white/60 text-sm font-medium">Our Story</span>
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Meet <span className="text-[#3b82f6]">Jaco Osijaye</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A dynamic gospel music minister celebrated for electrifying, vibrant, and charismatic performances that transform lives through worship.
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column - Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative"
          >
            {/* Image Slider Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDER_IMAGES[currentImageIndex].url}
                    alt={SLIDER_IMAGES[currentImageIndex].title}
                    fill
                    className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity duration-700" />
                  
                  {/* Enhanced Image Caption with Quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent"
                  >
                    <div className="max-w-xl space-y-4">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-2xl sm:text-3xl font-bold text-white mb-2"
                      >
                        {SLIDER_IMAGES[currentImageIndex].title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-[#3b82f6] text-lg"
                      >
                        {SLIDER_IMAGES[currentImageIndex].subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-white/90 text-base sm:text-lg italic leading-relaxed border-l-2 border-[#3b82f6] pl-4"
                      >
                        "With every word I speak, I magnify God's glory—igniting a revolution of hope that awakens nations and transforms lives worldwide."
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {SLIDER_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'w-8 bg-[#3b82f6]' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 pt-12 lg:pt-0"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {MINISTRY_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hover-card glass-effect p-6 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-[#3b82f6] mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Brief Story */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">The Journey</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Born and raised in Diobu, Port Harcourt, Rivers State, Jaco discovered his musical gift at age 13 in Gospel Life Ministry. His journey from one of the city's toughest neighborhoods to becoming a celebrated gospel minister is a testament to God's grace.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-white/60 text-sm">Est. 2013</span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors"
                >
                  <span>Read Full Story</span>
                  <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
              className="relative w-[90%] max-w-3xl h-[85vh] bg-black/95 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-[110]"
            >
              {/* Header Image Section */}
              <div className="relative h-[35vh]">
                <Image
                  src="/images/jaco_02.jpg"
                  alt="Jaco Osijaye"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-all duration-300 z-10"
                >
                  <FaTimes size={20} />
                </motion.button>

                {/* Title Section */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Our <span className="text-[#3b82f6]">Story</span>
                    </h2>
                    <p className="text-white/80 text-base">A journey of faith, music, and ministry</p>
                  </motion.div>
                </div>
              </div>

              {/* Content Area */}
              <div className="h-[50vh] overflow-y-auto custom-scrollbar">
                <div className="p-6 space-y-6">
                  {/* Timeline Section */}
                  <div className="relative space-y-6">
                    {/* Timeline Line */}
                    <div className="absolute left-[7px] sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#3b82f6] via-[#3b82f6]/50 to-transparent" />

                    {/* Timeline Items */}
                    {[
                      {
                        title: "Early Life",
                        date: "2000s",
                        content: "Born and raised in Diobu, Port Harcourt, Rivers State, Jaco discovered his musical gift at age 13 in Gospel Life Ministry. His journey from one of the city's toughest neighborhoods to becoming a celebrated gospel minister is a testament to God's grace."
                      },
                      {
                        title: "Ministry Journey",
                        date: "2013",
                        content: 'In 2013, he released his first album "Let the Shout Begin," marking the beginning of his mission to spread the gospel through music. This milestone opened doors for ministry opportunities across Nigeria and beyond.'
                      },
                      {
                        title: "Current Ministry",
                        date: "Present",
                        content: "Currently based in Dubai, UAE, Jaco serves as the coordinator of Worship Community UAE. His dedication earned him the RCCG SHIFT Award, and he has shared stages with renowned ministers like Pastor Nathaniel Bassey."
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 sm:pl-24"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 sm:left-6 top-3 w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-black shadow-lg shadow-[#3b82f6]/20" />
                        
                        {/* Content */}
                        <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                            <h3 className="text-xl font-bold text-[#3b82f6]">
                              {item.title}
                            </h3>
                            {item.date && (
                              <span className="px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm inline-block sm:inline">
                                {item.date}
                              </span>
                            )}
                          </div>
                          <p className="text-white/80 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </section>
  )
} 