'use client';

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaCalendar, FaPlus, FaSearch, FaFilter, FaSort, FaSpinner, FaSync } from 'react-icons/fa';
import Link from 'next/link';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { BlogPost } from '@/lib/types/blog';
import { BlogService } from '@/lib/services/blog';
import BlogPostModal from '@/components/blog/BlogPostModal';
import { useAuth } from '@/lib/hooks/useAuth';

interface ExtendedBlogPost extends BlogPost {
  category_name: string;
  author_name: string;
}

interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  status: 'draft' | 'published';
  tags: string[];
}

export default function BlogPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deletingPost, setDeletingPost] = useState<ExtendedBlogPost | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<ExtendedBlogPost | null>(null);
  const [posts, setPosts] = useState<ExtendedBlogPost[]>([]);

  useEffect(() => {
    // Force initialization of mock data
    if (typeof window !== 'undefined') {
      // Clear existing data to force reinitialization with mock data
      // This is just for demonstration purposes
      localStorage.removeItem('blog_posts');
    }
    
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      // Initialize localStorage with mock data if it doesn't exist
      if (typeof window !== 'undefined' && !localStorage.getItem('blog_posts')) {
        // This ensures the mock data is loaded if no posts exist yet
        await BlogService.getPosts({});
      }
      
      const response = await BlogService.getPosts({
        // Don't filter by status to get both published and draft posts
        // This ensures we see all posts, including those shown on the frontend
      });
      
      console.log('Loaded posts:', response.posts);
      setPosts(response.posts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Failed to load blog posts');
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await BlogService.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      setDeletingPost(null);
      toast.success('Blog post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (postData: BlogPostFormData) => {
    try {
      setLoading(true);
      if (currentPost) {
        // Update existing post
        const updatedPost = await BlogService.updatePost({
          id: currentPost.id,
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt || '',
          featured_image: postData.featured_image || '',
          category_id: postData.category_id,
          status: postData.status,
          tags: postData.tags
        });
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
        toast.success('Blog post updated successfully');
      } else {
        // Create new post
        const newPost = await BlogService.createPost({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt || '',
          featured_image: postData.featured_image || '',
          category_id: postData.category_id,
          status: postData.status,
          tags: postData.tags
        }, user?.id || 'guest');
        setPosts([newPost, ...posts]);
        toast.success('Blog post created successfully');
      }
      setShowAddModal(false);
      setCurrentPost(null);
    } catch (error) {
      toast.error('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h3 className="text-xl text-red-400 mb-2">Error Loading Blog Posts</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">Manage your blog content</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" size={14} />
          Add Post
        </button>
      </div>

      {/* Content Type Notice */}
      <div className="p-5 bg-blue-900/30 border-l-4 border-blue-500 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Church Content Management</h3>
        <p className="text-white text-base leading-relaxed">
          This admin panel manages church-related blog content including worship services, youth ministry, and community outreach programs. 
          All content created here will appear on the public-facing church blog.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass-effect p-4 rounded-xl flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select 
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button 
          onClick={loadPosts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaSync className="mr-2" />}
          Refresh
        </button>
      </div>

      {/* Blog Posts Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        {loading ? (
          <div className="animate-pulse p-4 space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-16 bg-white/5 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Title</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Category</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Author</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300">Views</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No blog posts found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr 
              key={post.id} 
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <h3 className="font-medium text-white truncate">{post.title}</h3>
                          <p className="text-xs text-gray-400 truncate mt-1">{post.excerpt}</p>
                </div>
                      </td>
                      <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full">
                          {post.category_name}
                    </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{post.author_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <FaEye className="w-3 h-3 mr-2 text-gray-400" />
                          {post.views}
                  </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="View post"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setCurrentPost(post);
                              setShowAddModal(true);
                            }}
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                            title="Edit post"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingPost(post)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Delete post"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingPost && (
        <DeleteConfirmationModal
          title="Delete Post"
          message={`Are you sure you want to delete "${deletingPost.title}"? This action cannot be undone.`}
          onConfirm={() => handleDelete(deletingPost.id)}
          onCancel={() => setDeletingPost(null)}
        />
      )}

      {/* Add/Edit Modal */}
      <BlogPostModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCurrentPost(null);
        }}
        onSave={handleSavePost}
        post={currentPost}
        isEditing={!!currentPost}
      />
    </div>
  );
} 