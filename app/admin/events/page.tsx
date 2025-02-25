'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash, FaPlus, FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import Button from '@/components/admin/Button'

// This would typically come from your API or database
const EVENTS = [
  {
    id: 1,
    title: "ANCIENT SOUNDS, FRESH FIRE",
    subtitle: "30 Days of Hymns – A Journey of Worship",
    date: "March 1st, 2024",
    time: "9:00 PM (UAE Time)",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1602083566804-f3c1dd32e2b7?auto=format&fit=crop&q=85&w=2000",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Gospel Music Festival 2024",
    subtitle: "A Night of Pure Worship",
    date: "April 15th, 2024",
    time: "7:00 PM (UAE Time)",
    location: "Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=85&w=2000",
    status: "Planning"
  },
  {
    id: 3,
    title: "Worship Night with Jaco",
    subtitle: "An Intimate Evening of Worship",
    date: "February 20th, 2024",
    time: "8:00 PM (UAE Time)",
    location: "Sharjah, UAE",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85&w=2000",
    status: "Completed"
  }
]

export default function Events() {
  const handleEdit = (id: number) => {
    console.log('Edit event:', id)
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      console.log('Delete event:', id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button icon={FaPlus}>
          Create New Event
        </Button>
      </div>

      <div className="grid gap-6">
        {EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="flex gap-6 p-6">
                {/* Event Image */}
                <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      event.status === 'Upcoming' 
                        ? 'bg-green-500/10 text-green-500'
                        : event.status === 'Planning'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {event.title}
                  </h2>
                  <p className="text-[#3b82f6] mb-3">{event.subtitle}</p>
                  <div className="grid grid-cols-2 gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-[#3b82f6]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#3b82f6]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#3b82f6]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-start gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FaEdit}
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={FaTrash}
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 