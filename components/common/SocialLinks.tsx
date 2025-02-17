import React from 'react'
import { FaYoutube, FaSpotify, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'
import { SITE_CONFIG } from '@/constants'

interface SocialLinksProps {
  className?: string
}

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  const socialLinks = [
    { icon: FaYoutube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
    { icon: FaSpotify, href: SITE_CONFIG.social.spotify, label: 'Spotify' },
    { icon: FaInstagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
    { icon: FaFacebookF, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
    { icon: FaTiktok, href: SITE_CONFIG.social.tiktok, label: 'TikTok' },
  ]

  return (
    <div className={`flex items-center ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-colors"
          aria-label={link.label}
        >
          <link.icon size={24} />
        </a>
      ))}
    </div>
  )
} 