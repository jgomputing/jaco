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
    <main className="relative min-h-screen">
      {/* Content Sections */}
      <div className="relative flex flex-col min-h-screen">
        {/* Hero - Full screen with video background */}
        <div className="relative h-[75vh]">
          <HeroSection />
        </div>

        {/* About - Offset grid layout */}
        <div className="relative mt-8 sm:mt-16">
          <AboutSection />
        </div>

        {/* Media - Full width with dynamic background */}
        <div className="relative mt-8 sm:mt-16">
          <MediaSection />
        </div>

        {/* Blog - Alternating layout */}
        <div className="relative mt-8 sm:mt-16">
          <BlogSection />
        </div>

        {/* Contact - Clean layout with map */}
        <div className="relative mt-8 sm:mt-16">
          <ContactSection />
        </div>

        {/* Footer */}
        <div className="relative mt-8 sm:mt-16">
          <FooterSection />
        </div>
      </div>

      <ScrollIndicator />
    </main>
  )
} 