'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCalendar } from 'react-icons/fa'

const CONTACT_INFO = {
  email: "bookings@jacomusical.com",
  phone: "+971 50 123 4567",
  location: "Dubai, United Arab Emirates",
  bookingHours: "Available for bookings 24/7"
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Contact <span className="text-[#3b82f6]">Us</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Available for church events, gospel concerts, and special occasions
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info Cards */}
            {[
              {
                icon: FaEnvelope,
                title: "Email Us",
                info: CONTACT_INFO.email,
                link: `mailto:${CONTACT_INFO.email}`,
                color: "hover:bg-[#3b82f6]"
              },
              {
                icon: FaPhone,
                title: "Call Us",
                info: CONTACT_INFO.phone,
                link: `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`,
                color: "hover:bg-green-500"
              },
              {
                icon: FaMapMarkerAlt,
                title: "Location",
                info: CONTACT_INFO.location,
                link: "https://maps.google.com/?q=Dubai",
                color: "hover:bg-red-500"
              },
              {
                icon: FaCalendar,
                title: "Booking Hours",
                info: CONTACT_INFO.bookingHours,
                color: "hover:bg-purple-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/20 via-purple-600/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block p-6 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <ContactCard {...item} />
                  </a>
                ) : (
                  <div className="p-6 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                    <ContactCard {...item} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-full hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg group"
            >
              <FaEnvelope className="text-xl" />
              <span className="font-medium">Send us a Message</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, info, color = "hover:bg-[#3b82f6]" }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-white/5 text-white group-hover:text-white transition-colors ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">
          {title}
        </h3>
        <p className="text-white/60">
          {info}
        </p>
      </div>
    </div>
  )
} 