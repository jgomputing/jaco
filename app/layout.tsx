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
    default: 'Jaco Osijaye - Creative Developer & Designer',
  },
  description: 'Creative Developer & Designer crafting innovative digital experiences.',
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
    title: 'Jaco Osijaye - Creative Developer & Designer',
    description: 'Creative Developer & Designer crafting innovative digital experiences.',
    url: 'https://jacoosijaye.com',
    siteName: 'Jaco Osijaye',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Jaco Osijaye',
    card: 'summary_large_image',
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