import dynamic from 'next/dynamic'

// Dynamic imports for client components
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'))
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'))
const MediaSection = dynamic(() => import('@/components/sections/MediaSection'))
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'))
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'))
const FooterSection = dynamic(() => import('@/components/sections/FooterSection'))
const ScrollIndicator = dynamic(() => import('@/components/ui/ScrollIndicator'))

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3b82f6]/10 via-black/0 to-transparent" />
      </div>

      {/* Content Sections */}
      <div className="relative flex flex-col min-h-screen">
        {/* Hero - Full screen with video background */}
        <div className="relative min-h-screen">
          <HeroSection />
        </div>

        {/* About - Offset grid layout */}
        <div className="relative py-20">
          <AboutSection />
        </div>

        {/* Media - Full width with dynamic background */}
        <div className="relative">
          <MediaSection />
        </div>

        {/* Blog - Alternating layout */}
        <div className="relative py-20 bg-gradient-to-b from-black via-black/95 to-black">
          <BlogSection />
        </div>

        {/* Contact - Clean layout with map */}
        <div className="relative py-20">
          <ContactSection />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>

      <ScrollIndicator />
    </main>
  )
} 