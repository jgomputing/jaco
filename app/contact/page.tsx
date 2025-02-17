'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'
import Image from 'next/image'

// Contact Information
const CONTACT_INFO = {
  email: "contact@jacomusical.com",
  phone: "+1 (555) 123-4567",
  address: "123 Worship Street, Music City, MC 12345",
  socialMedia: {
    youtube: "https://youtube.com/jacomusical",
    spotify: "https://spotify.com/artist/jacomusical",
    instagram: "https://instagram.com/jacomusical",
    facebook: "https://facebook.com/jacomusical",
    tiktok: "https://tiktok.com/@jacomusical"
  }
}

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
    // Show success message (you can implement this)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <label className="block text-white/80 mb-2" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
            placeholder="John Doe"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <label className="block text-white/80 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
            placeholder="john@example.com"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <label className="block text-white/80 mb-2" htmlFor="subject">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
          placeholder="How can we help you?"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <label className="block text-white/80 mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 resize-none"
          placeholder="Write your message here..."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-medium transition-all duration-300 ${
            isSubmitting 
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:from-[#2563eb] hover:to-[#1d4ed8] hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </motion.div>
    </form>
  )
}

// Contact Info Card Component
const ContactInfoCard = ({ 
  icon: Icon, 
  title, 
  content 
}: { 
  icon: React.ElementType, 
  title: string, 
  content: string 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex items-start gap-4 group hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-[#3b82f6] text-2xl" />
    </div>
    <div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-white/60">{content}</p>
    </div>
  </motion.div>
)

// Social Media Button Component
const SocialButton = ({ 
  icon: Icon, 
  href, 
  label 
}: { 
  icon: React.ElementType, 
  href: string, 
  label: string 
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-[#3b82f6] hover:bg-white/10 transition-all duration-300"
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
)

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Have questions about our ministry or want to collaborate? We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form Section */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Send us a Message
            </motion.h2>
            <ContactForm />
          </div>

          {/* Contact Information Section */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Contact Information
            </motion.h2>

            <div className="space-y-6 mb-12">
              <ContactInfoCard
                icon={FaEnvelope}
                title="Email"
                content={CONTACT_INFO.email}
              />
              <ContactInfoCard
                icon={FaPhone}
                title="Phone"
                content={CONTACT_INFO.phone}
              />
              <ContactInfoCard
                icon={FaMapMarkerAlt}
                title="Address"
                content={CONTACT_INFO.address}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-white">
                Connect on Social Media
              </h3>
              <div className="flex gap-4">
                <SocialButton
                  icon={FaYoutube}
                  href={CONTACT_INFO.socialMedia.youtube}
                  label="YouTube"
                />
                <SocialButton
                  icon={FaSpotify}
                  href={CONTACT_INFO.socialMedia.spotify}
                  label="Spotify"
                />
                <SocialButton
                  icon={FaInstagram}
                  href={CONTACT_INFO.socialMedia.instagram}
                  label="Instagram"
                />
                <SocialButton
                  icon={FaFacebookF}
                  href={CONTACT_INFO.socialMedia.facebook}
                  label="Facebook"
                />
                <SocialButton
                  icon={FaTiktok}
                  href={CONTACT_INFO.socialMedia.tiktok}
                  label="TikTok"
                />
              </div>
            </motion.div>

            {/* Map or Additional Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 relative h-[300px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85"
                alt="Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors"
                >
                  View on Google Maps
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
} 