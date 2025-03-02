'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaImage, FaTimes, FaArrowLeft, FaEye, FaTag, FaCalendarAlt, FaLink } from 'react-icons/fa';
import { FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaQuoteRight, FaCode, FaLink as FaLinkIcon } from 'react-icons/fa';
import Link from 'next/link';

// Mock blog posts data for demo
const blogPosts = [
  {
    id: 1,
    title: "Connecting Worship: My Musical Journey with Jaco Osij",
    content: "A personal reflection on the spiritual and musical journey...\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "A personal reflection on the spiritual and musical journey...",
    date: "Feb 16, 2024",
    views: "1.2K",
    status: "published",
    category: "Personal Journey",
    author: "Jaco Osij",
    tags: "worship,music,journey",
    featuredImage: "/images/blog/worship-journey.jpg",
    seo: {
      metaTitle: "My Musical Journey with Jaco Osij - A Spiritual Experience",
      metaDescription: "Explore the spiritual and musical journey of Jaco Osij through worship and connection with faith.",
      keywords: "worship,music,faith,journey,gospel"
    }
  },
  {
    id: 2,
    title: "Gospel Music Events in 2025: A Season of Praise",
    content: "Upcoming gospel music events and festivals to look forward to...\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    excerpt: "Upcoming gospel music events and festivals to look forward to...",
    date: "Feb 15, 2024",
    views: "856",
    status: "published",
    category: "Events",
    author: "Admin User",
    tags: "events,gospel,music,2025",
    featuredImage: "/images/blog/gospel-events.jpg",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: ""
    }
  },
  {
    id: 3,
    title: "The Power of Collaboration: Gospel Meets Global",
    content: "Exploring the impact of cross-cultural gospel music collaborations...\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    excerpt: "Exploring the impact of cross-cultural gospel music collaborations...",
    date: "Feb 14, 2024",
    views: "723",
    status: "published",
    category: "Industry Insights",
    author: "Guest Writer",
    tags: "collaboration,global,gospel",
    featuredImage: "/images/blog/collaboration.jpg",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: ""
    }
  },
  {
    id: 4,
    title: "Upcoming Album Release: Behind the Scenes",
    content: "An exclusive look at the making of the new album...\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    excerpt: "An exclusive look at the making of the new album...",
    date: "Feb 10, 2024",
    views: "512",
    status: "draft",
    category: "News",
    author: "Jaco Osij",
    tags: "album,behind the scenes,music",
    featuredImage: "/images/blog/album-release.jpg",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: ""
    }
  }
];

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const postId = parseInt(params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: null as File | null,
    featuredImagePreview: '',
    status: 'draft' as 'draft' | 'published',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      ogImage: null as File | null,
      ogImagePreview: ''
    }
  });

  // Load post data
  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from API
        // const response = await fetch(`/api/posts/${postId}`);
        // const post = await response.json();
        
        // For demo, we'll use mock data
        const post = blogPosts.find(p => p.id === postId);
        
        if (post) {
          setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            category: post.category,
            tags: post.tags,
            featuredImage: null,
            featuredImagePreview: post.featuredImage,
            status: post.status as 'draft' | 'published',
            seo: {
              metaTitle: post.seo.metaTitle,
              metaDescription: post.seo.metaDescription,
              keywords: post.seo.keywords,
              ogImage: null,
              ogImagePreview: ''
            }
          });
        } else {
          // Post not found
          router.push('/admin/blog');
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          [seoField as string]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'featured' | 'og') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'featured') {
        setFormData({
          ...formData,
          featuredImage: file,
          featuredImagePreview: reader.result as string
        });
      } else {
        setFormData({
          ...formData,
          seo: {
            ...formData.seo,
            ogImage: file,
            ogImagePreview: reader.result as string
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlSubmit = () => {
    if (!imageUrl.trim()) return;
    
    setFormData({
      ...formData,
      featuredImage: null,
      featuredImagePreview: imageUrl
    });
    
    setImageUrl('');
  };

  const removeImage = (type: 'featured' | 'og') => {
    if (type === 'featured') {
      setFormData({
        ...formData,
        featuredImage: null,
        featuredImagePreview: ''
      });
      setImageUrl('');
    } else {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          ogImage: null,
          ogImagePreview: ''
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally send the data to your API
      console.log('Updating post data:', {
        id: postId,
        ...formData,
        status: saveAsDraft ? 'draft' : formData.status
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to blog list
      router.push('/admin/blog');
      
    } catch (error) {
      console.error('Error updating post:', error);
      setIsSubmitting(false);
    }
  };

  const generateExcerptFromContent = () => {
    // Strip HTML and get plain text
    const text = formData.content;
    
    // Limit to ~150 characters
    const excerpt = text.substring(0, 147) + (text.length > 147 ? '...' : '');
    
    setFormData({
      ...formData,
      excerpt
    });
  };

  // Text formatting functions
  const insertFormatting = (startTag: string, endTag: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const beforeText = formData.content.substring(0, start);
    const afterText = formData.content.substring(end);
    
    const newText = beforeText + startTag + selectedText + (endTag || startTag) + afterText;
    setFormData({
      ...formData,
      content: newText
    });
    
    // Set focus back to textarea and position cursor after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length + selectedText.length + (endTag || startTag).length,
        start + startTag.length + selectedText.length + (endTag || startTag).length
      );
    }, 0);
  };
  
  const formatBold = () => insertFormatting('**');
  const formatItalic = () => insertFormatting('*');
  const formatHeading = () => insertFormatting('## ');
  const formatUnorderedList = () => insertFormatting('- ');
  const formatOrderedList = () => insertFormatting('1. ');
  const formatQuote = () => insertFormatting('> ');
  const formatCode = () => insertFormatting('`', '`');
  const formatLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = formData.content.substring(start, end);
      const linkText = selectedText || 'link text';
      
      insertFormatting('[' + linkText + '](', ')');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="glass-effect rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full" />
          <p className="text-white/70 text-sm animate-pulse">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center glass-effect rounded-xl p-3">
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/blog" 
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-white">Edit Blog Post</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
            className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 text-sm"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
          >
            <FaSave className="w-3.5 h-3.5 mr-1.5" />
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'content' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'seo' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('seo')}
        >
          SEO Settings
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
        {activeTab === 'content' ? (
          /* Content Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Title */}
              <div className="glass-effect rounded-xl p-4">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-lg"
                  required
                />
              </div>

              {/* Content Editor - With formatting toolbar */}
              <div className="glass-effect rounded-xl p-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>
                
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-1 mb-2 p-1 bg-white/5 rounded-lg border border-white/10">
                  <button 
                    type="button" 
                    onClick={formatBold}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Bold"
                  >
                    <FaBold />
                  </button>
                  <button 
                    type="button" 
                    onClick={formatItalic}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Italic"
                  >
                    <FaItalic />
                  </button>
                  <button 
                    type="button" 
                    onClick={formatHeading}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Heading"
                  >
                    <FaHeading />
                  </button>
                  <div className="h-5 w-px bg-white/10 mx-1"></div>
                  <button 
                    type="button" 
                    onClick={formatUnorderedList}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Bullet List"
                  >
                    <FaListUl />
                  </button>
                  <button 
                    type="button" 
                    onClick={formatOrderedList}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Numbered List"
                  >
                    <FaListOl />
                  </button>
                  <div className="h-5 w-px bg-white/10 mx-1"></div>
                  <button 
                    type="button" 
                    onClick={formatQuote}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Quote"
                  >
                    <FaQuoteRight />
                  </button>
                  <button 
                    type="button" 
                    onClick={formatCode}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Code"
                  >
                    <FaCode />
                  </button>
                  <button 
                    type="button" 
                    onClick={formatLink}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors" 
                    title="Link"
                  >
                    <FaLinkIcon />
                  </button>
                </div>
                
                <textarea
                  id="content"
                  ref={textareaRef}
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog post content here..."
                  className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white resize-y"
                  style={{ fontFamily: 'Titillium Web, sans-serif' }}
                ></textarea>
                
                <p className="text-xs text-gray-500 mt-1">
                  Use the formatting toolbar or Markdown syntax for styling
                </p>
              </div>

              {/* Excerpt */}
              <div className="glass-effect rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                    Excerpt
                  </label>
                  <button
                    type="button"
                    onClick={generateExcerptFromContent}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Generate from content
                  </button>
                </div>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your post (shown in previews)..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white h-20"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.excerpt.length}/150 characters recommended
                </p>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-4">
              {/* Featured Image */}
              <div className="glass-effect rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image
                </label>
                
                {formData.featuredImagePreview ? (
                  <div className="relative rounded-lg overflow-hidden mb-2">
                    <img 
                      src={formData.featuredImagePreview} 
                      alt="Featured preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('featured')}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Image Input Type Selector */}
                    <div className="flex border-b border-white/10 mb-3">
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                          imageInputType === 'upload' 
                            ? 'text-blue-400 border-b-2 border-blue-400' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setImageInputType('upload')}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                          imageInputType === 'url' 
                            ? 'text-blue-400 border-b-2 border-blue-400' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setImageInputType('url')}
                      >
                        Image URL
                      </button>
                    </div>
                    
                    {imageInputType === 'upload' ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-white/40 transition-colors"
                      >
                        <FaImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-300 text-sm">Click to upload image</p>
                        <p className="text-gray-500 text-xs mt-1">1200 x 630px recommended</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex">
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL..."
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleImageUrlSubmit}
                            className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                          >
                            <FaLink />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs">
                          Paste a direct link to an image (JPG, PNG, GIF)
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e, 'featured')}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Category and Tags - Updated to use text input */}
              <div className="glass-effect rounded-xl p-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  <FaTag className="inline mr-2" />
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Please enter a category..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white mb-3"
                />
                
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                  <FaTag className="inline mr-2" />
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                />
              </div>

              {/* Publication Status */}
              <div className="glass-effect rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Publication Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-300 text-sm">Draft</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-300 text-sm">Publish</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* SEO Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main SEO Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-effect rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-3">Search Engine Optimization</h3>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      id="metaTitle"
                      name="seo.metaTitle"
                      value={formData.seo.metaTitle}
                      onChange={handleInputChange}
                      placeholder="SEO title (if different from post title)..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave blank to use the post title. 50-60 characters recommended.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      id="metaDescription"
                      name="seo.metaDescription"
                      value={formData.seo.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Brief description for search engines..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white h-20"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      150-160 characters recommended.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      name="seo.keywords"
                      value={formData.seo.keywords}
                      onChange={handleInputChange}
                      placeholder="Enter keywords separated by commas..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-3">Preview</h3>
                
                <div className="bg-white rounded-lg p-3">
                  <div className="text-gray-800">
                    <p className="text-blue-600 text-lg font-medium truncate">
                      {formData.seo.metaTitle || formData.title || 'Post Title'}
                    </p>
                    <p className="text-green-700 text-sm truncate">
                      https://yourwebsite.com/blog/post-slug
                    </p>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {formData.seo.metaDescription || formData.excerpt || 'Your post description will appear here...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar Column */}
            <div className="space-y-4">
              <div className="glass-effect rounded-xl p-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Social Media Image
                </label>
                
                {formData.seo.ogImagePreview ? (
                  <div className="relative rounded-lg overflow-hidden mb-2">
                    <img 
                      src={formData.seo.ogImagePreview} 
                      alt="OG preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('og')}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => document.getElementById('ogImageUpload')?.click()}
                    className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-white/40 transition-colors"
                  >
                    <FaImage className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-300 text-sm">Upload social image</p>
                    <p className="text-gray-500 text-xs mt-1">1200 x 630px recommended</p>
                  </div>
                )}
                
                <input
                  type="file"
                  id="ogImageUpload"
                  onChange={(e) => handleImageUpload(e, 'og')}
                  accept="image/*"
                  className="hidden"
                />
                
                <p className="text-xs text-gray-500 mt-2">
                  This image will be displayed when your post is shared on social media.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 