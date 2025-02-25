'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash, FaPlus, FaPlay, FaPause, FaMusic, FaCalendar, FaClock, FaTag } from 'react-icons/fa'
import Button from '@/components/admin/Button'
import Link from 'next/link'

// This would typically come from your API or database
const MUSIC_TRACKS = [
  {
    id: 1,
    title: "Follow Jesus",
    duration: "4:32",
    image: "/images/jaco_02.jpg",
    releaseDate: "Jan 15, 2024",
    genre: "Gospel",
    status: "Released"
  },
  {
    id: 2,
    title: "I Cannot Fail",
    duration: "5:15",
    image: "/images/jaco_02.jpg",
    releaseDate: "Dec 1, 2023",
    genre: "Worship",
    status: "Released"
  },
  {
    id: 3,
    title: "Hailing Your Name",
    duration: "6:03",
    image: "/images/jaco_02.jpg",
    releaseDate: "Coming Soon",
    genre: "Praise",
    status: "Upcoming"
  }
]

export default function MusicTracks() {
  const router = useRouter()
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const handlePlay = (id: number) => {
    if (playingTrack === id) {
      setPlayingTrack(null)
    } else {
      setPlayingTrack(id)
    }
  }

  const handleEdit = async (id: number) => {
    setLoading({ ...loading, [`edit-${id}`]: true })
    try {
      // Add your edit logic here
      router.push(`/admin/music/edit/${id}`)
    } catch (error) {
      console.error('Error editing track:', error)
    } finally {
      setLoading({ ...loading, [`edit-${id}`]: false })
    }
  }

  const handleDelete = async (id: number) => {
    setLoading({ ...loading, [`delete-${id}`]: true })
    try {
      if (window.confirm('Are you sure you want to delete this track? This action cannot be undone.')) {
        // Add your delete API call here
        console.log('Delete track:', id)
      }
    } catch (error) {
      console.error('Error deleting track:', error)
    } finally {
      setLoading({ ...loading, [`delete-${id}`]: false })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        >
          Music Tracks
        </motion.h1>
        <Link href="/admin/music/create">
          <Button 
            icon={FaPlus}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
          >
            Upload New Track
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {MUSIC_TRACKS.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-6 p-6">
                {/* Album Art with Play Button */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() => handlePlay(track.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    {playingTrack === track.id ? (
                      <FaPause className="text-white text-2xl transform hover:scale-110 transition-transform" />
                    ) : (
                      <FaPlay className="text-white text-2xl transform hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-sm rounded-full">
                      {track.genre}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      track.status === 'Released' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {track.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
                    {track.title}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#3b82f6]" />
                      <span>Duration: {track.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-[#3b82f6]" />
                      <span>Release: {track.releaseDate}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FaEdit}
                    onClick={() => handleEdit(track.id)}
                    disabled={loading[`edit-${track.id}`]}
                    className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading[`edit-${track.id}`] ? 'Editing...' : 'Edit'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={FaTrash}
                    onClick={() => handleDelete(track.id)}
                    disabled={loading[`delete-${track.id}`]}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading[`delete-${track.id}`] ? 'Deleting...' : 'Delete'}
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