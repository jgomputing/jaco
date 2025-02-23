'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowRight, FaClock, FaYoutube, FaInstagram, FaFacebook, FaPlay, FaMusic, FaPrayingHands } from 'react-icons/fa'

const UPCOMING_EVENT = {
  title: "ANCIENT SOUNDS, FRESH FIRE",
  subtitle: "30 Days of Hymns – A Journey of Worship",
  description: "Are you searching for a deeper connection with God through worship? Do you yearn for a spiritual revival that ignites your faith? Get ready for an unforgettable journey with 30 Days of Hymns – A Journey of Worship",
  time: "9:00 PM (UAE Time)",
  features: [
    {
      icon: FaMusic,
      title: "Timeless Hymns with Fresh Anointing",
      description: "Be prepared for a powerful encounter as ancient melodies are infused with fresh fire."
    },
    {
      icon: FaClock,
      title: "Daily Uploads",
      description: "A new hymn every day at 9:00 PM (UAE Time) to keep you connected and inspired."
    },
    {
      icon: FaPrayingHands,
      title: "Journey of Worship",
      description: "Immerse yourself in the presence of God and experience personal revival through worship."
    }
  ],
  image: "https://images.unsplash.com/photo-1602083566804-f3c1dd32e2b7?auto=format&fit=crop&q=85&w=2000",
  startDate: "Starting March 1st, 2024"
}

const FEATURED_POSTS = [
  {
    id: 1,
    title: "The Journey of Gospel Music Ministry",
    excerpt: "From local church events to international stages, discover how our musical journey has been transforming lives through worship.",
    date: "Feb 15, 2024",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=85&w=2000",
    category: "Ministry"
  },
  {
    id: 2,
    title: "Behind the Scenes: Making of 'I Cannot Fail'",
    excerpt: "Get an exclusive look into the creative process and spiritual inspiration behind our latest worship anthem.",
    date: "Feb 10, 2024",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=85&w=2000",
    category: "Music"
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-8 relative scroll-mt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full opacity-[0.02] blur-3xl" />
      </div>

      <div className="container px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-2">
            Upcoming Event
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
            Blog & <span className="text-[#3b82f6]">Updates</span>
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
            Stay updated with our journey, music insights, and upcoming events that will transform your worship experience
          </p>
        </motion.div>

        {/* Featured Event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#3b82f6]/10 via-purple-500/5 to-transparent p-8 sm:p-12 rounded-3xl border border-[#3b82f6]/20 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Event Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#3b82f6]">
                    <FaPlay className="animate-pulse" />
                    <span className="text-sm font-semibold tracking-wider uppercase">{UPCOMING_EVENT.startDate}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    {UPCOMING_EVENT.title}
                  </h3>
                  <p className="text-[#3b82f6] text-xl font-semibold">
                    {UPCOMING_EVENT.subtitle}
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {UPCOMING_EVENT.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6">
                  {UPCOMING_EVENT.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="p-3 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-white transition-colors">
                        <feature.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-white/60 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <p className="text-white font-medium">Follow us to stay updated:</p>
                  <div className="flex gap-4">
                    <a
                      href="https://youtube.com/@jacoosijaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 bg-white/5 hover:bg-[#FF0000] rounded-xl transition-all duration-300 transform hover:scale-110">
                        <FaYoutube className="text-2xl text-white/80 group-hover:text-white" />
                      </div>
                    </a>
                    <a
                      href="https://instagram.com/jacoosijaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 bg-white/5 hover:bg-[#E1306C] rounded-xl transition-all duration-300 transform hover:scale-110">
                        <FaInstagram className="text-2xl text-white/80 group-hover:text-white" />
                      </div>
                    </a>
                    <a
                      href="https://facebook.com/jacoosijaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 bg-white/5 hover:bg-[#1877F2] rounded-xl transition-all duration-300 transform hover:scale-110">
                        <FaFacebook className="text-2xl text-white/80 group-hover:text-white" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Event Image */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                >
                  <Image
                    src={UPCOMING_EVENT.image}
                    alt="30 Days of Hymns"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 rounded-full bg-[#3b82f6] flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      <FaPlay className="text-white text-2xl ml-2" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Time Badge */}
                <div className="absolute -bottom-6 right-6 px-6 py-4 bg-[#3b82f6] rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 text-white">
                    <FaClock className="text-xl" />
                    <span className="font-semibold">{UPCOMING_EVENT.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Latest Updates</h3>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#3b82f6]/5">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-[#3b82f6] rounded-full text-white text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                    <FaCalendar className="text-[#3b82f6]" />
                    {post.date}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-[#3b82f6] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/60 text-base mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors font-medium group"
                  >
                    Read More 
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
} 