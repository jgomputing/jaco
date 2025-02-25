'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowLeft, FaShare, FaClock, FaBookmark, FaLinkedin, FaTwitter } from 'react-icons/fa'
import FooterSection from '@/components/sections/FooterSection'

// This would typically come from an API or database
const BLOG_POSTS = [
  {
    id: 1,
    title: "Connecting Worship: My Musical Journey with Jaco Osijaye",
    content: `
      As a gospel musician and worship leader in Dubai, my passion has always been to inspire and uplift through music. One of the most exciting parts of my journey has been connecting with other talented gospel artists, and one name that truly stands out is Jaco Osijaye.

      ## Why Jaco Osijaye?

      Jaco Osijaye is known as one of the most influential local gospel artists in the UAE. His powerful voice and heartfelt worship resonate with listeners worldwide. When I first heard his music, I knew that our collaboration could create a worship experience like no other.

      ## Our Musical Connection

      - Shared passion for authentic worship
      - Unique blend of cultural influences
      - Focus on spirit-led performances
      - Commitment to excellence in ministry
      - Vision for global impact

      ## Future Collaborations

      Our journey together is just beginning, and we're excited about the upcoming projects that will bring fresh expressions of worship to the global stage. Stay tuned for more updates on our collaborative works and ministry events.
    `,
    date: "Feb 16, 2024",
    image: "/images/jaco_02.jpg",
    category: "Personal"
  },
  {
    id: 2,
    title: "Gospel Music Events in 2025: A Season of Praise",
    content: `
      2025 promises to be filled with impactful events across the globe. From intimate worship gatherings to large-scale festivals, the gospel community is coming together like never before. Personally, I'm looking forward to several upcoming events, and I am excited about the opportunity to connect with fellow musicians, worship leaders, and fans.

      One event that stands out to me is the Gospel Music Festival taking place in various locations. These festivals bring together the best in gospel and worship music, providing a platform for new and seasoned artists to share their gifts. These events are also perfect for engaging with fans and musicians who share the same passion for uplifting others through the power of music.

      Another huge highlight is the Hallelujah Challenge, which has become an annual viral movement. This challenge, led by popular gospel artist Nathaniel Bassey, brings thousands together globally for 30 days of worship, prayer, and reflection. It's not just an event—it's a movement that has united believers around the world, transcending borders and creating a massive spiritual community online.

      ## Notable Events

      - The Experience (Lagos, Nigeria): One of the largest gospel music concerts in the world, featuring some of the biggest names in the gospel industry, including Sinach, Nathaniel Bassey, and other international gospel artists
      - GMA Dove Awards (USA): A prestigious event that honors the best in Christian and gospel music, with performances from top gospel artists like Tasha Cobbs Leonard, Kirk Franklin, and Mercy Chinwo
      - The Joyful Noise Gospel Music Festival (South Africa): A major event for gospel artists in Africa and beyond, celebrating the diversity and unity of gospel music worldwide

      It's not just about performing for me; it's about connecting with people, hearing their stories, and sharing in the power of worship. These gatherings have become sacred spaces where music is the bridge that connects hearts.
    `,
    date: "Feb 15, 2024",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=85&w=2000",
    category: "Events"
  },
  {
    id: 3,
    title: "The Power of Collaboration: Gospel Meets Global",
    content: `
      For me, the best part of the gospel music scene is the spirit of collaboration. I've always believed that we are stronger together, and when artists come together, beautiful things happen. One of the most exciting things about 2025 is the potential for new collaborations, not just within the gospel community, but across the global music scene.

      I'm thrilled at the thought of collaborating with artists like Mercy Chinwo, Joe Mettle, Jaco Osijaye, and Sinach, who are already making waves within gospel music. But beyond that, the possibility of working with internationally acclaimed artists like Tasha Cobbs Leonard, Kirk Franklin, Hillsong United, Lauren Daigle, and Elevation Worship is incredibly exciting. These artists have massive followings worldwide and their influence can help expand the reach of gospel music to more people.

      The power of collaboration in gospel music isn't just about blending voices—it's about sharing the message of the gospel with a wider audience. Each collaboration is an opportunity to bring our unique gifts together and create something that resonates with listeners across the globe. In 2025, I believe we will see more of these powerful partnerships, and I am excited to see where this journey will take us.

      ## Featured Artists

      - Mercy Chinwo: Nigerian gospel sensation known for powerful vocals
      - Joe Mettle: Award-winning Ghanaian worship leader
      - Jaco Osijaye: Innovative gospel artist with a unique sound
      - Sinach: International worship leader with global impact
      - Tasha Cobbs Leonard: Grammy-winning gospel artist
      - Kirk Franklin: Revolutionary gospel artist and producer
      - Hillsong United: Global worship movement
      - Lauren Daigle: Contemporary Christian music powerhouse
      - Elevation Worship: Modern worship collective

      ## Vision for Collaboration

      These partnerships represent more than just musical arrangements—they're about building bridges between different styles, cultures, and expressions of worship. Through these collaborations, we're creating a tapestry of sound that reflects the diversity and unity of the global church.
    `,
    date: "Feb 14, 2024",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=85&w=2000",
    category: "Collaboration"
  },
  {
    id: 4,
    title: "Christian Music Awards: Celebrating Excellence and Passion",
    content: `
      Another exciting aspect of 2025 is the Christian Music Awards. These prestigious awards recognize the artistry, dedication, and unwavering faith that gospel musicians bring to the table. While it's always an honor to see artists celebrated for their hard work, what excites me most about these events is how they highlight the diversity and creativity within the gospel genre.

      The gospel music industry is so much more than just entertainment—it's a ministry. Each performance, each song, is an offering to God, and to see those offerings recognized at such events is both humbling and inspiring. These awards remind us that our work has a far-reaching impact on lives, and they encourage us to continue creating music that touches hearts and changes lives.

      As I reflect on the upcoming Christian Music Awards, I am reminded of how blessed we are to be part of this ministry. While awards celebrate our collective journey, they also motivate us to stay focused on our mission—using music to glorify God and touch lives.
    `,
    date: "Feb 13, 2024",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=85&w=2000",
    category: "Awards"
  },
  {
    id: 5,
    title: "Global Gospel Music Festivals 2025",
    content: `
      The landscape of gospel music festivals is evolving, and 2025 is shaping up to be a transformative year. These festivals bring together the best in gospel and worship music, providing a platform for new and seasoned artists to share their gifts.

      ## Festival Highlights

      - Multiple stages featuring different worship styles
      - International artist collaborations
      - Youth worship programs
      - Prayer and ministry sessions
      - Cultural exchange through music

      ## Making an Impact

      Gospel music festivals serve as catalysts for spiritual renewal and community building. They create spaces where people can experience God's presence through worship while fostering connections between artists and audiences.

      ## Looking Forward

      As we approach 2025, we're seeing innovative approaches to festival organization, incorporating both traditional and contemporary elements of worship music.
    `,
    date: "Feb 12, 2024",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=85&w=2000",
    category: "Festivals"
  },
  {
    id: 6,
    title: "Connecting Through Gospel Music",
    content: `
      The power of gospel music lies in its ability to connect people across cultures, generations, and backgrounds. These gatherings provide perfect opportunities for engaging with fans and musicians who share the same passion for uplifting others through the power of music.

      ## Building Connections

      - Artist-fan interactions
      - Collaborative worship sessions
      - Community outreach programs
      - Mentorship opportunities
      - Cross-cultural worship experiences

      ## The Impact of Connection

      When we come together through music, we create something greater than ourselves. These connections lead to:
      
      - New musical collaborations
      - Spiritual growth
      - Cultural understanding
      - Ministry opportunities
      - Lasting friendships

      ## Looking Ahead

      As we continue to grow and connect through gospel music, we're seeing new ways of building and maintaining these valuable relationships, both in person and digitally.
    `,
    date: "Feb 10, 2024",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85&w=2000",
    category: "Community"
  }
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false)

  const handleShare = async (platform?: string) => {
    if (platform) {
      let url = ''
      const postUrl = window.location.href
      const text = `Check out this article: ${post?.title}`

      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`
          break
        case 'linkedin':
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
          break
      }
      window.open(url, '_blank')
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.content.split('\n')[0],
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  const post = BLOG_POSTS.find(post => post.id === parseInt(params.id))

  if (!post) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <Link 
              href="/#blog" 
              className="text-[#3b82f6] hover:text-white transition-colors"
            >
              Return to Blog
            </Link>
          </div>
        </div>
        <FooterSection />
      </>
    )
  }

  return (
    <>
      <article className="min-h-screen py-20">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
        </div>

        <div className="container px-4 relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#3b82f6] transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-[#3b82f6] rounded-full text-white text-sm font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                <FaCalendar className="text-[#3b82f6]" />
                {post.date}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {/* Share and Actions Bar */}
            <div className="sticky top-4 z-10 flex items-center justify-between mb-12 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleShare()}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] rounded-xl text-white transition-all duration-300"
                >
                  <FaShare size={14} />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <FaTwitter className="text-white/60 hover:text-white text-lg" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <FaLinkedin className="text-white/60 hover:text-white text-lg" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <FaBookmark className={`text-lg ${isBookmarked ? 'text-[#3b82f6]' : 'text-white/60 hover:text-white'}`} />
              </button>
            </div>

            <div className="space-y-8">
              {post.content.split('\n').map((paragraph, index) => {
                // Handle section titles
                if (paragraph.includes('What to Expect') || 
                    paragraph.includes('Impact on the Community') || 
                    paragraph.includes('Get Involved') ||
                    paragraph.includes('Festival Highlights') ||
                    paragraph.includes('Making an Impact') ||
                    paragraph.includes('Looking Forward') ||
                    paragraph.includes('Building Connections') ||
                    paragraph.includes('The Impact of Connection') ||
                    paragraph.includes('Looking Ahead')) {
                  return (
                    <div key={index} className="pt-8">
                      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-4">
                        <div className="w-1.5 h-12 bg-[#3b82f6] rounded-full" />
                        {paragraph.replace('##', '').trim()}
                      </h2>
                    </div>
                  )
                }
                
                // Handle list items with reduced spacing
                if (paragraph.startsWith('-')) {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 group hover:translate-x-2 transition-all duration-300 mb-1 last:mb-0"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#3b82f6] mt-2.5 group-hover:scale-150 transition-transform" />
                      <p className="text-white/80 group-hover:text-white transition-colors text-base tracking-wide">
                        {paragraph.replace('-', '').trim()}
                      </p>
                    </motion.div>
                  )
                }

                // Handle regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-white/80 text-base tracking-wide leading-7"
                    >
                      {paragraph}
                    </motion.p>
                  )
                }
                return null
              })}
            </div>

            {/* Article Info */}
            <div className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-purple-500/10 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white/60 text-sm">Published on</p>
                  <p className="text-white font-medium">{post.date}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-white/60 text-sm">Category</p>
                  <p className="text-white font-medium">{post.category}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                        <FaCalendar className="text-[#3b82f6]" />
                        {relatedPost.date}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#3b82f6] transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </article>
      <FooterSection />
    </>
  )
} 