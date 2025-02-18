import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaTicketAlt, FaArrowRight, FaMusic, FaMicrophone, FaChurch } from 'react-icons/fa'

// Sample Events Data
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Gospel Night Worship",
    date: "March 15, 2024",
    time: "7:00 PM",
    location: "Grace Community Church",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    ticketUrl: "#"
  },
  {
    id: 2,
    title: "Easter Celebration",
    date: "March 31, 2024",
    time: "10:00 AM",
    location: "City Convention Center",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    ticketUrl: "#"
  }
]

// Services Data
const PERFORMANCE_SERVICES = [
  {
    icon: FaMusic,
    title: "Worship Events",
    description: "Leading praise and worship for church services and special events"
  },
  {
    icon: FaMicrophone,
    title: "Gospel Concerts",
    description: "Full concert performances featuring our complete worship band"
  },
  {
    icon: FaChurch,
    title: "Ministry Events",
    description: "Special ministry events, conferences, and spiritual gatherings"
  }
]

export default function EventsSection() {
  return (
    <section id="events" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="container">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3b82f6]/5 to-transparent opacity-20" />
              
              <div className="relative">
                {/* Header */}
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#3b82f6]/10 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-[#3b82f6] uppercase tracking-wider text-sm font-medium">Events & Bookings</span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-6">
                  Join Us in 
                  <span className="text-[#3b82f6]"> Worship</span>
                </h2>

                <div className="space-y-8">
                  <p className="text-lg text-white/70 leading-relaxed">
                    Experience powerful worship events and book us for your special occasions. We're available for church services, concerts, and ministry events.
                  </p>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PERFORMANCE_SERVICES.map((service, index) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group hover:bg-[#3b82f6] bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 group-hover:bg-white/10 flex items-center justify-center mb-3 transition-all duration-300">
                          <service.icon className="text-[#3b82f6] group-hover:text-white text-xl transition-all duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-sm text-white/70 group-hover:text-white/90 transition-all duration-300">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-medium hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg group"
                    >
                      Book an Event
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-2">
                        <FaCalendar className="text-[#3b82f6]" /> {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaClock className="text-[#3b82f6]" /> {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#3b82f6]" /> {event.location}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={event.ticketUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors"
                      >
                        <FaTicketAlt /> Get Tickets
                      </a>
                      <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Learn More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 