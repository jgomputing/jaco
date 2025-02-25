import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jaco-osijaye.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jaco Osijaye | Official Website',
    template: '%s | Jaco Osijaye'
  },
  description: 'Official website of Jaco Osijaye - Gospel Artist, Worship Leader, and Minister.',
  keywords: ['Jaco Osijaye', 'Gospel Music', 'Worship', 'Christian Music', 'Nigerian Gospel'],
  authors: [{ name: 'Jaco Osijaye' }],
  creator: 'Jaco Osijaye',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Jaco Osijaye',
    title: 'Jaco Osijaye | Official Website',
    description: 'Official website of Jaco Osijaye - Gospel Artist, Worship Leader, and Minister.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Jaco Osijaye'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaco Osijaye | Official Website',
    description: 'Official website of Jaco Osijaye - Gospel Artist, Worship Leader, and Minister.',
    images: [`${siteUrl}/images/og-image.jpg`],
    creator: '@jacoosijaye'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
} 