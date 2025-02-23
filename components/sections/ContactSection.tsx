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

interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  info: string;
  color?: string;
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-4 relative scroll-mt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-[0.03] blur-3xl animate-pulse-slow" />
      </div>

      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-2">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Contact <span className="text-[#3b82f6]">Us</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Only available for Church Program and .line
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    className="block p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] hover:scale-[1.02] cursor-pointer transition-all duration-300"
                  >
                    <ContactCard {...item} />
                  </a>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] hover:scale-[1.02] cursor-pointer transition-all duration-300">
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
            className="text-center mt-6"
          >
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-[14px] sm:text-[15px] bg-[#3b82f6] hover:bg-[#2563eb] hover:scale-[1.02] cursor-pointer text-white transition-all duration-300 rounded-xl relative overflow-hidden"
            >
              <div className="relative flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <FaEnvelope className="text-sm sm:text-base" />
                </div>
                <span className="font-medium">Send us a Message</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, info, color = "hover:bg-[#3b82f6]" }: ContactCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-white/5 text-white group-hover:text-white transition-colors ${color}`}>
        <Icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">
          {title}
        </h3>
        <p className="text-white/60 group-hover:text-white/80 transition-colors">
          {info}
        </p>
      </div>
    </div>
  )
} 