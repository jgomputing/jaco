'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendar, FaClock, FaMapMarkerAlt, FaChurch, FaPrayingHands, FaUsers, FaMusic, FaMicrophone, FaHandshake, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

// Event Categories
const EVENT_CATEGORIES = [
  'All Events',
  'Live Performances',
  'Workshops',
  'Festivals',
  'Tours',
  'Special Events'
]

// Performance Services
const PERFORMANCE_SERVICES = [
  {
    id: 1,
    title: "Live Performances",
    icon: <FaMusic className="text-3xl" />,
    description: "Professional gospel music performances for events and venues"
  },
  {
    id: 2,
    title: "Music Production",
    icon: <FaMicrophone className="text-3xl" />,
    description: "Studio recording and music production services"
  },
  {
    id: 3,
    title: "Workshops",
    icon: <FaUsers className="text-3xl" />,
    description: "Music and songwriting workshops for aspiring artists"
  },
  {
    id: 4,
    title: "Collaborations",
    icon: <FaHandshake className="text-3xl" />,
    description: "Artist collaborations and featured performances"
  }
]

// Upcoming Events Data
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Christmas Special Performance",
    date: "Dec 24, 2023",
    time: "7:00 PM",
    location: "Grace Community Center",
    type: "Live Performances",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "Join us for a magical evening of gospel music and celebration",
    details: "Experience an unforgettable night of soul-stirring gospel music."
  },
  {
    id: 2,
    title: "Youth Music Festival",
    date: "Jan 15, 2024",
    time: "6:30 PM",
    location: "Hope Center Arena",
    type: "Festivals",
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "Special performance at the annual youth music festival",
    details: "A celebration of young talent and contemporary gospel music."
  },
  {
    id: 3,
    title: "Songwriting Workshop",
    date: "Jan 28, 2024",
    time: "2:00 PM",
    location: "Music Academy Hall",
    type: "Workshops",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "Learn songwriting techniques and music production",
    details: "Comprehensive workshop covering songwriting, composition, and production techniques."
  }
]

// Booking Form Component
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventType: '',
    preferredDate: '',
    details: ''
  })
  const [mounted, setMounted] = useState(false)

  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  // Only render form on client-side
  if (!mounted) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">Book JACO for Your Event</h3>
        <p className="text-white/80 mb-8">Loading booking form...</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6">Book JACO for Your Event</h3>
      <p className="text-white/80 mb-8">Looking to bring the power of gospel music to your event? Fill out the form below to check availability and discuss performance details.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-white/80 mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white/80 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-white/80 mb-2">Organization/Church Name</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20"
            placeholder="Your organization name"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="eventType" className="block text-white/80 mb-2">Event Type</label>
          <select
            id="eventType"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20 appearance-none cursor-pointer"
            required
          >
            <option value="" disabled>Select event type</option>
            <option value="church-service">Church Service</option>
            <option value="concert">Concert</option>
            <option value="conference">Conference</option>
            <option value="wedding">Wedding</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className="block text-white/80 mb-2">Preferred Date</label>
          <input
            type="date"
            id="preferredDate"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Event Details */}
        <div>
          <label htmlFor="details" className="block text-white/80 mb-2">Event Details</label>
          <textarea
            id="details"
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300 border border-white/20 min-h-[120px] resize-y"
            placeholder="Please provide details about your event..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-medium hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  )
}

// Event Card Component
const EventCard = ({ event }: { event: typeof UPCOMING_EVENTS[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      <Image
        src={event.thumbnail}
        alt={event.title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      {/* Event Type Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-[#3b82f6] rounded-full text-white text-sm">
        {event.type}
      </div>

      {/* Date Badge */}
      <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-xl text-white text-center">
        <div className="text-sm font-medium">{event.date}</div>
        <div className="text-xs text-white/80">{event.time}</div>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
        {event.title}
      </h3>
      <p className="text-white/60 text-sm mb-4">
        {event.description}
      </p>
      <div className="space-y-2 text-white/60 text-sm">
        <div className="flex items-center gap-2">
          <FaClock className="text-[#3b82f6]" />
          {event.time}
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#3b82f6]" />
          {event.location}
        </div>
      </div>
    </div>
  </motion.div>
)

// Service Card Component
const ServiceCard = ({ service }: { service: typeof PERFORMANCE_SERVICES[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl group hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      {service.icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">
      {service.title}
    </h3>
    <p className="text-white/60">
      {service.description}
    </p>
  </motion.div>
)

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('All Events')
  const filteredEvents = activeCategory === 'All Events'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter(event => event.type === activeCategory)

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Events & Performances
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Experience the power of gospel music live. Discover upcoming performances, book an event, or join our workshops.
          </p>
        </motion.div>

        {/* Performance Services Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Services Offered
            </h2>
            <p className="text-white/80">
              Explore the various ways we can collaborate and create amazing musical experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PERFORMANCE_SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-white/80">
              Join us at our upcoming events and be part of our ministry.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            {EVENT_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Booking Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Book Our Ministry
                </h2>
                <p className="text-white/80">
                  Interested in having us minister at your church or event? Fill out the form below and we'll get back to you soon.
                </p>
              </motion.div>
              <BookingForm />
            </div>

            {/* Booking Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">
                  What to Expect
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                      <FaMusic className="text-[#3b82f6] text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Professional Performance</h4>
                      <p className="text-white/60">
                        Experience high-quality gospel music performances that touch hearts and uplift spirits.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                      <FaMicrophone className="text-[#3b82f6] text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Quality Production</h4>
                      <p className="text-white/60">
                        State-of-the-art sound equipment and professional production quality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                      <FaHandshake className="text-[#3b82f6] text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Collaborative Spirit</h4>
                      <p className="text-white/60">
                        Open to collaborations and creating unique musical experiences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-white font-medium mb-4">Need More Information?</h4>
                  <p className="text-white/60 mb-6">
                    Contact us directly for specific questions about our ministry services and availability.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors"
                  >
                    Contact Us <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 