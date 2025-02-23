import type { Metadata } from 'next'
import { Titillium_Web } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-titillium',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jacoosijaye.com'),
  title: {
    template: '%s | Jaco Osijaye',
    default: 'Jaco Osijaye - Gospel Artist & Music Minister',
  },
  description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister based in Dubai, UAE. Join us in spreading God\'s love through worship.',
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
    'Follow Jesus',
    'I Cannot Fail',
    'Hailing Your Name',
    'Worship Community UAE'
  ],
  authors: [{ name: 'Jaco Osijaye' }],
  creator: 'Jaco Osijaye',
  publisher: 'Jaco Osijaye',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Jaco Osijaye - Gospel Artist & Music Minister',
    description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister based in Dubai, UAE.',
    url: 'https://jacoosijaye.com',
    siteName: 'Jaco Osijaye',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/jaco_02.jpg',
        width: 1200,
        height: 630,
        alt: 'Jaco Osijaye - Gospel Artist & Music Minister'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaco Osijaye - Gospel Artist & Music Minister',
    description: 'Experience powerful worship through music with Jaco Osijaye, a dynamic gospel music minister.',
    creator: '@jacoosijaye',
    images: ['/images/jaco_02.jpg']
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <body className={titilliumWeb.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 