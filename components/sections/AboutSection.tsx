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
              className="absolute -bottom-6 -right-6 sm:-bottom-6 sm:-right-6 bg-[#3b82f6] p-3 sm:p-4 rounded-2xl shadow-xl max-w-[200px] sm:max-w-[280px] text-sm sm:text-base"
            >
              <FaQuoteLeft className="text-white/20 text-xl sm:text-2xl absolute top-3 sm:top-4 left-3 sm:left-4" />
              <p className="text-white text-sm sm:text-base font-medium relative z-10 mt-3 sm:mt-4">
                "Using my voice to glorify God, inspire nations, and touch lives around the world."
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
                <div className="text-white">
                  <div className="font-semibold text-xs sm:text-sm">Jaco Osijaye</div>
                  <div className="text-[10px] sm:text-xs text-white/80">Gospel Artist & Minister</div>
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
            >
              {/* Scrollable Content */}
              <div className="relative bg-gradient-to-br from-[#3b82f6]/10 to-black/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors hover:bg-white/10 rounded-xl z-10 backdrop-blur-sm"
                >
                  <FaTimes size={24} />
                </button>

                {/* Modal Header with Image */}
                <div className="relative h-48 sm:h-64 w-full">
                  <Image
                    src="/images/jaco_02.jpg"
                    alt="Jaco Osijaye"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      Our <span className="text-[#3b82f6]">Story</span>
                    </h2>
                    <p className="text-white/80">A journey of faith, music, and ministry</p>
                  </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="overflow-y-auto max-h-[calc(90vh-16rem)] custom-scrollbar">
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Timeline Section */}
                    <div className="relative space-y-8">
                      {/* Timeline Line */}
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3b82f6] via-[#3b82f6]/50 to-transparent" />

                      {/* Early Life */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                          <span className="text-[#3b82f6]">Early Life</span>
                          <span className="text-sm text-white/40 font-normal">2000s</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Born and raised in Diobu, Port Harcourt, Rivers State, Jaco discovered his musical gift at age 13 in Gospel Life Ministry. His journey from one of the city's toughest neighborhoods to becoming a celebrated gospel minister is a testament to God's grace.
                        </p>
                      </div>

                      {/* Ministry Journey */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                          <span className="text-[#3b82f6]">Ministry Journey</span>
                          <span className="text-sm text-white/40 font-normal">2013</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          In 2013, he released his first album "Let the Shout Begin," marking the beginning of his mission to spread the gospel through music. This milestone opened doors for ministry opportunities across Nigeria and beyond.
                        </p>
                      </div>

                      {/* Current Ministry */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                          <span className="text-[#3b82f6]">Current Ministry</span>
                          <span className="text-sm text-white/40 font-normal">Present</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Currently based in Dubai, UAE, Jaco serves as the coordinator of Worship Community UAE. His dedication earned him the RCCG SHIFT Award, and he has shared stages with renowned ministers like Pastor Nathaniel Bassey.
                        </p>
                      </div>

                      {/* Personal Life */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3">
                          <span className="text-[#3b82f6]">Personal Life</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Alongside his ministry, Jaco is happily married to Gift Duman Jacob, blessed with two children, Gilda and Gianna. His family life stands as a testimony to God's faithfulness and grace.
                        </p>
                      </div>

                      {/* Vision & Mission */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3">
                          <span className="text-[#3b82f6]">Vision & Mission</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          As a worship leader and music minister, Jaco's mission is to inspire youth Christians to discover and develop their musical gifts for worship and service. Through powerful music ministry, he aims to foster a culture of excellence, drawing young people closer to God while nurturing their talents in a way that honors Him.
                        </p>
                      </div>

                      {/* HR Ministry Mission */}
                      <div className="relative pl-20">
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-black/80 shadow-lg" />
                        <h3 className="text-xl font-semibold text-white mb-3">
                          <span className="text-[#3b82f6]">HR Ministry Mission</span>
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Supporting the Human Resources Ministry by mentoring youth in music and leadership, Jaco creates a platform for young talents to grow both spiritually and professionally. His commitment extends to developing the next generation of worship leaders who will carry the torch of musical excellence and spiritual devotion.
                        </p>
                      </div>
                    </div>
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
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </section>
  )
} 