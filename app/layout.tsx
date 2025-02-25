import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-titillium'
})

export const metadata: Metadata = {
  title: {
    default: 'JACO - Official Website',
    template: '%s | JACO'
  },
  description: 'Official website of JACO - Music Artist and Producer',
  keywords: ['JACO', 'music', 'artist', 'producer', 'electronic', 'dance', 'EDM'],
  authors: [{ name: 'JACO' }],
  creator: 'JACO',
  publisher: 'JACO',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaco.com',
    siteName: 'JACO',
    title: 'JACO - Official Website',
    description: 'Official website of JACO - Music Artist and Producer',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JACO'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JACO - Official Website',
    description: 'Official website of JACO - Music Artist and Producer',
    creator: '@jacomusic',
    images: ['/images/twitter-image.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <body className="font-titillium bg-black text-white">
        {children}
      </body>
    </html>
  )
} 