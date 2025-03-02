import React, { useState, useEffect } from 'react';
import { FaImage, FaTimes, FaSearch, FaTag, FaNewspaper, FaGlobe, FaLink } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { compressImage, validateImage } from '@/lib/utils/imageCompression';
import toast from 'react-hot-toast';
import { BlogPost } from '@/lib/types/blog';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  status: 'draft' | 'published';
  tags: string[];
  meta_title?: string;
  meta_description?: string;
}

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPostFormData) => void;
  post?: BlogPost | null;
  isEditing?: boolean;
}

export default function BlogPostModal({ isOpen, onClose, onSave, post, isEditing = false }: BlogPostModalProps) {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    status: 'draft',
    tags: [],
    meta_title: '',
    meta_description: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        featured_image: post.featured_image || '',
        category_id: post.category_id,
        status: post.status,
        tags: post.tags,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        featured_image: '',
        category_id: '',
        status: 'draft',
        tags: [],
        meta_title: '',
        meta_description: ''
      });
    }
  }, [post]);

  const handleImageUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      // Validate the image
      validateImage(file);

      // Compress the image
      const compressedFile = await compressImage(file);
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(compressedFile);

      // Update the form data
      setFormData(prev => ({
        ...prev,
        featured_image: imageUrl
      }));

      toast.success('Image processed successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        featured_image: imageUrl
      }));
      setImageUrl('');
      setShowImageUrlInput(false);
      toast.success('Image URL added successfully');
    } else {
      toast.error('Please enter a valid image URL');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set meta title to post title if not provided
    if (!formData.meta_title) {
      formData.meta_title = formData.title;
    }
    
    // Set meta description to excerpt if not provided
    if (!formData.meta_description) {
      formData.meta_description = formData.excerpt;
    }
    
    onSave(formData);
  };

  if (!isOpen) return null;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151F32] rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'content' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('content')}
          >
            <FaNewspaper className="mr-2" />
            Content
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${
              activeTab === 'seo' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('seo')}
          >
            <FaGlobe className="mr-2" />
            SEO
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {activeTab === 'content' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - Image and metadata */}
                  <div className="space-y-6">
                    {/* Featured Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Featured Image
                      </label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="featured-image-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file);
                            }
                          }}
                        />
                        <label
                          htmlFor="featured-image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          {formData.featured_image ? (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                              <Image
                                src={formData.featured_image}
                                alt="Featured image preview"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-sm font-medium">Change Image</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <FaImage className="text-3xl text-gray-400 mb-2" />
                              <span className="text-sm text-gray-300">Click to upload image</span>
                              <span className="text-xs text-gray-500 mt-1">
                                Recommended: 1200x630px, max 5MB
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                      
                      {/* Image URL Input Option */}
                      <div className="mt-2">
                        {showImageUrlInput ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-sm"
                              placeholder="Enter image URL"
                            />
                            <button
                              type="button"
                              onClick={handleImageUrlSubmit}
                              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowImageUrlInput(false)}
                              className="p-2 text-gray-400 hover:text-white"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowImageUrlInput(true)}
                            className="flex items-center text-sm text-blue-400 hover:text-blue-300"
                          >
                            <FaLink className="mr-1" size={14} />
                            Add image from URL
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                        placeholder="Enter category"
                      />
                      <p className="text-xs text-gray-500">Example: Worship, Youth, Outreach</p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300 flex items-center">
                        <FaTag className="mr-2 text-gray-400" />
                        Tags
                      </label>
                      <input
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                        placeholder="Enter tags, separated by commas"
                      />
                      <p className="text-xs text-gray-500">Example: Worship, Sermon, Prayer</p>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Status
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.status === 'draft'}
                            onChange={() => setFormData({ ...formData, status: 'draft' })}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Draft</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.status === 'published'}
                            onChange={() => setFormData({ ...formData, status: 'published' })}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Published</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right column - Title, content, excerpt */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white text-lg"
                        placeholder="Enter post title"
                        required
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Content
                      </label>
                      <div className="bg-white rounded-lg">
                        <ReactQuill
                          value={formData.content}
                          onChange={(content) => setFormData({ ...formData, content })}
                          modules={modules}
                          theme="snow"
                          className="h-64 text-gray-900"
                          placeholder="Start writing your content here..."
                        />
                      </div>
                      <style jsx global>{`
                        .ql-editor {
                          color: #333 !important;
                          background-color: white !important;
                        }
                        .ql-editor.ql-blank::before {
                          color: #666 !important;
                        }
                      `}</style>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                        rows={3}
                        placeholder="Enter a brief summary of your post"
                      />
                      <p className="text-xs text-gray-500">This will be displayed on the blog listing page and in search results.</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">SEO Settings</h3>
                  <p className="text-sm text-gray-300">Optimize your post for search engines to improve visibility.</p>
                </div>

                {/* Meta Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    placeholder="Enter meta title (defaults to post title if empty)"
                  />
                  <p className="text-xs text-gray-500">Recommended length: 50-60 characters</p>
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    rows={4}
                    placeholder="Enter meta description (defaults to excerpt if empty)"
                  />
                  <p className="text-xs text-gray-500">Recommended length: 150-160 characters</p>
                </div>

                {/* SEO Preview */}
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Search Engine Preview</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="text-blue-600 text-lg font-medium truncate">
                      {formData.meta_title || formData.title || 'Post Title'}
                    </h4>
                    <p className="text-green-700 text-sm truncate">
                      {window.location.origin}/blog/{formData.title.toLowerCase().replace(/\s+/g, '-')}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                      {formData.meta_description || formData.excerpt || 'Post description will appear here.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-white/10 flex justify-between items-center">
          <div>
            {formData.status === 'published' && (
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                Will be published immediately
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : isEditing ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 