'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaMusic, FaTshirt, FaBook, FaSearch, FaHeart, FaShare } from 'react-icons/fa'
import Image from 'next/image'

// Store Categories
const STORE_CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Products',
    icon: <FaShoppingCart className="text-xl" />,
    description: 'Browse our complete collection'
  },
  { 
    id: 'music', 
    name: 'Gospel CDs & Digital',
    icon: <FaMusic className="text-xl" />,
    description: 'Albums and digital downloads'
  },
  { 
    id: 'merch', 
    name: 'Merchandise',
    icon: <FaTshirt className="text-xl" />,
    description: 'T-shirts and apparel'
  },
  { 
    id: 'books', 
    name: 'Books & Resources',
    icon: <FaBook className="text-xl" />,
    description: 'Educational materials'
  }
]

// Sample Products Data
const PRODUCTS = [
  {
    id: 1,
    title: "Divine Love Album",
    category: "music",
    price: 14.99,
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "Latest gospel album featuring 12 powerful worship songs",
    format: "CD & Digital Download",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    title: "Worship Collection T-Shirt",
    category: "merch",
    price: 24.99,
    thumbnail: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    description: "Premium quality t-shirt with artistic gospel design",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: 3,
    title: "Gospel Songwriting Guide",
    category: "books",
    price: 19.99,
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    description: "Comprehensive guide to writing gospel music",
    format: "Paperback & Digital",
    inStock: true
  }
]

// Category Card Component
const CategoryCard = ({ category, isActive, onClick }: { 
  category: typeof STORE_CATEGORIES[0], 
  isActive: boolean,
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    className={`p-6 rounded-2xl text-left transition-all duration-300 flex flex-col gap-3 ${
      isActive
        ? 'bg-[#3b82f6] text-white'
        : 'bg-white/5 text-white/70 hover:bg-white/10'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
      {category.icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg">{category.name}</h3>
      <p className="text-sm opacity-80">{category.description}</p>
    </div>
  </motion.button>
)

// Product Card Component
const ProductCard = ({ product }: { product: typeof PRODUCTS[0] }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-[#3b82f6] rounded-full text-white font-medium">
          ${product.price}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm">
          {product.category}
        </div>

        {/* Action Buttons Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg"
          >
            <FaShoppingCart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg"
          >
            <FaHeart size={20} />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
          {product.title}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="flex items-center justify-between">
          <div className="text-white/60 text-sm">
            {product.format || (product.sizes && `Sizes: ${product.sizes.join(', ')}`)}
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <button className="text-white/60 hover:text-[#3b82f6] transition-colors">
              <FaShare size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = PRODUCTS.filter(product => 
    (activeCategory === 'all' || product.category === activeCategory) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Gospel Store
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Discover our collection of gospel music, merchandise, and resources. Support our ministry while spreading the message of faith.
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-xl mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/40" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STORE_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 