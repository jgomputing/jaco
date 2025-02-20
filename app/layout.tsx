import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import BackgroundEffects from '@/components/layout/BackgroundEffects'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium-web',
})

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <body>
        <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-black/95 to-black">
          <BackgroundEffects />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 