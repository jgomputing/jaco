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
    <section id="about" className="py-20 relative overflow-hidden scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3b82f6] rounded-full opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-[0.07] blur-3xl" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto px-4"
        >
          <span className="text-[#3b82f6] uppercase tracking-wider text-xs sm:text-sm font-medium">Our Story</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            Meet <span className="text-[#3b82f6]">Jaco Osijaye</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            A dynamic gospel music minister celebrated for electrifying, vibrant, and charismatic performances that transform lives through worship.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column - Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Slider Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDER_IMAGES[currentImageIndex].url}
                    alt={SLIDER_IMAGES[currentImageIndex].title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
                  
                  {/* Image Caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 right-6 text-white"
                  >
                    <h3 className="text-2xl font-bold mb-1">
                      {SLIDER_IMAGES[currentImageIndex].title}
                    </h3>
                    <p className="text-white/80">
                      {SLIDER_IMAGES[currentImageIndex].subtitle}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                {SLIDER_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'w-6 bg-[#3b82f6]' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -right-6 sm:-bottom-6 sm:-right-6 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl p-3 sm:p-4 md:p-5 rounded-2xl shadow-xl max-w-[180px] xs:max-w-[220px] sm:max-w-[280px] md:max-w-[320px] text-xs sm:text-sm md:text-base border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-50" />
              <FaQuoteLeft className="text-white/10 text-base sm:text-xl md:text-2xl absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5" />
              <p className="text-white/90 font-medium relative z-10 mt-2 sm:mt-3 md:mt-4 leading-relaxed">
                "With every word I speak, I magnify God's glory—igniting a revolution of hope that awakens nations and transforms lives worldwide."
              </p>
              <div className="mt-3 sm:mt-4 md:mt-5 flex items-center gap-2 sm:gap-3">
                <div className="text-white/90">
                  <div className="font-semibold text-[10px] sm:text-xs md:text-sm">Jaco Osijaye</div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs text-white/70">Gospel Artist & Minister</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Story Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {MINISTRY_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-[#3b82f6] mb-1">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Brief Story */}
            <div className="bg-gradient-to-r from-[#3b82f6]/10 to-transparent p-6 rounded-2xl border border-[#3b82f6]/20">
              <h3 className="text-xl font-semibold text-white mb-3">The Journey</h3>
              <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
                Born and raised in Diobu, Port Harcourt, Rivers State, Jaco discovered his musical gift at age 13 in Gospel Life Ministry. His journey from one of the city's toughest neighborhoods to becoming a celebrated gospel minister is a testament to God's grace. In 2013, he released his first album "Let the Shout Begin," marking the beginning of his mission to spread the gospel through music.
              </p>
            </div>

            {/* Read More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center pt-4"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-full hover:bg-[#3b82f6]/90 transition-all duration-300"
              >
                Read Full Story
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
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