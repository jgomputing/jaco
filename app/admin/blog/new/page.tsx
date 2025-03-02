'use client';

import React, { useState, useRef } from 'react';
import { FaSave, FaBold, FaItalic, FaHeading, FaListUl, FaListOl, 
  FaQuoteRight, FaCode, FaLink, FaImage, FaTimes, FaUpload } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';

export default function NewBlogPost() {
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: [] as string[],
    category: '',
    status: 'draft'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const [newTag, setNewTag] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handlePostChange = (field: string, value: string) => {
    setPost({ ...post, [field]: value });
  };

  const handleAddTag = () => {
    if (newTag && !post.tags.includes(newTag)) {
      setPost({ ...post, tags: [...post.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter(tag => tag !== tagToRemove) });
  };

  const savePost = async () => {
    setIsSaving(true);
    setSaveMessage({ text: '', type: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage({ 
        text: 'Blog post saved successfully!', 
        type: 'success' 
      });
    } catch (error) {
      setSaveMessage({ 
        text: 'Failed to save blog post. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Text formatting functions
  const insertFormatting = (startTag: string, endTag: string = '') => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = post.content.substring(start, end);
    const beforeText = post.content.substring(0, start);
    const afterText = post.content.substring(end);
    
    const newText = beforeText + startTag + selectedText + (endTag || startTag) + afterText;
    handlePostChange('content', newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length + selectedText.length + (endTag || startTag).length,
        start + startTag.length + selectedText.length + (endTag || startTag).length
      );
    }, 0);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900">
      <Head>
        <title>New Blog Post - Jaco Osijaye</title>
      </Head>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-gray-800/50 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
        <h1 className="text-xl font-semibold text-white" style={{ fontFamily: 'Titillium Web, sans-serif' }}>New Blog Post</h1>
        <div className="flex items-center space-x-2">
          <select
            value={post.status}
            onChange={(e) => handlePostChange('status', e.target.value)}
            className="px-3 py-1.5 bg-black/20 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={savePost}
            disabled={isSaving}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 text-sm"
          >
            <FaSave className="mr-1.5" size={12} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage.text && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg p-3 ${
          saveMessage.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        } backdrop-blur-sm text-sm max-w-md animate-fade-in-out`}>
          {saveMessage.text}
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {/* Main Content */}
        <div className="col-span-8">
          <div className="bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm p-4 space-y-4">
            {/* Title */}
            <div>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handlePostChange('title', e.target.value)}
                placeholder="Post Title"
                className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-lg font-medium"
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              />
            </div>

            {/* Formatting Tools */}
            <div className="flex items-center space-x-1 border-y border-white/10 py-2">
              {[
                { icon: FaBold, action: () => insertFormatting('**'), tooltip: 'Bold' },
                { icon: FaItalic, action: () => insertFormatting('*'), tooltip: 'Italic' },
                { icon: FaHeading, action: () => insertFormatting('## '), tooltip: 'Heading' },
                { icon: FaListUl, action: () => insertFormatting('- '), tooltip: 'Bullet List' },
                { icon: FaListOl, action: () => insertFormatting('1. '), tooltip: 'Numbered List' },
                { icon: FaQuoteRight, action: () => insertFormatting('> '), tooltip: 'Quote' },
                { icon: FaCode, action: () => insertFormatting('`'), tooltip: 'Code' },
                { icon: FaLink, action: () => insertFormatting('[](url)'), tooltip: 'Link' },
                { icon: FaImage, action: () => insertFormatting('![alt](url)'), tooltip: 'Image' }
              ].map(({ icon: Icon, action, tooltip }) => (
                <button
                  key={tooltip}
                  onClick={action}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                  title={tooltip}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Content */}
            <textarea
              ref={contentRef}
              value={post.content}
              onChange={(e) => handlePostChange('content', e.target.value)}
              placeholder="Write your post content here... (Markdown supported)"
              className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm min-h-[400px] font-mono"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-4">
          {/* Cover Image */}
          <div className="bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm p-4">
            <h2 className="text-sm font-medium text-white mb-3">Cover Image</h2>
            {post.coverImage ? (
              <div className="relative aspect-video rounded-md overflow-hidden mb-2">
                <Image
                  src={post.coverImage}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handlePostChange('coverImage', '')}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-md p-4 text-center">
                <button className="flex items-center justify-center w-full text-sm text-gray-400 hover:text-white transition-colors">
                  <FaUpload size={14} className="mr-2" />
                  Upload Cover Image
                </button>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm p-4">
            <h2 className="text-sm font-medium text-white mb-3">Excerpt</h2>
            <textarea
              value={post.excerpt}
              onChange={(e) => handlePostChange('excerpt', e.target.value)}
              placeholder="Brief description of your post..."
              className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm h-24"
            />
          </div>

          {/* Category & Tags */}
          <div className="bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm p-4">
            <h2 className="text-sm font-medium text-white mb-3">Category & Tags</h2>
            <select
              value={post.category}
              onChange={(e) => handlePostChange('category', e.target.value)}
              className="w-full px-3 py-1.5 mb-3 bg-black/20 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            >
              <option value="">Select Category</option>
              <option value="music">Music</option>
              <option value="worship">Worship</option>
              <option value="events">Events</option>
              <option value="lifestyle">Lifestyle</option>
            </select>

            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-400 hover:text-blue-300"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag"
                className="flex-1 px-3 py-1.5 bg-black/20 border border-white/10 rounded-l-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
              <button
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-l-0 border-white/10 rounded-r-md hover:bg-blue-600/30 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 