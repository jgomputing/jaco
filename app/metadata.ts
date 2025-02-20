import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jaco Musical - Gospel Artist & Minister',
  description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister.',
  keywords: [
    'Jaco Osijaye',
    'Gospel Music',
    'Worship Leader',
    'Christian Music',
    'Gospel Artist',
    'Music Minister',
    'Worship Music',
    'Gospel Songs',
    'Christian Worship',
    'Dubai Gospel',
    'UAE Worship',
  ],
  authors: [{ name: 'Jaco Osijaye' }],
  creator: 'Jaco Osijaye',
  publisher: 'Jaco Musical',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Jaco Musical - Gospel Artist & Minister',
    description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister.',
    url: 'https://jacomusical.com',
    siteName: 'Jaco Musical',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaco Musical - Gospel Artist & Minister',
    description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister.',
    creator: '@jacoosijaye',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} 