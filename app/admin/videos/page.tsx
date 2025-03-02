'use client';

import React, { useState } from 'react';
import { FaPlay, FaYoutube, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSave, FaTimes, FaVideo, FaLink } from 'react-icons/fa';
import Image from 'next/image';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

// Sample Video Data (same structure as frontend)
const INITIAL_VIDEO_DATA = [
  {
    id: 1,
    title: "Sunday Worship Service Highlights",
    category: "worship",
    youtubeId: "3c6HrdtX5iA",
    thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    description: "Experience the powerful moments from our Sunday worship service",
    duration: "15:23",
    date: "Dec 15, 2023",
    views: "1.2K",
    featured: true,
    tags: ['worship', 'live', 'sunday-service'],
    location: "Main Sanctuary"
  },
  {
    id: 2,
    title: "Behind the Scenes: Album Recording",
    category: "behind-scenes",
    youtubeId: "VI8Qjl3vfNc",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=85",
    description: "Get an exclusive look at the making of our latest album",
    duration: "8:45",
    date: "Nov 20, 2023",
    views: "856",
    featured: false,
    tags: ['recording', 'studio', 'album'],
    location: "Recording Studio"
  },
  {
    id: 3,
    title: "Live Concert Performance - Full Show",
    category: "performances",
    youtubeId: "YTT4SgKRb1M",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=85",
    description: "Watch our complete live concert performance from the City Hall event",
    duration: "1:28:32",
    date: "Oct 5, 2023",
    views: "2.3K",
    featured: true,
    tags: ['concert', 'live', 'performance'],
    location: "City Hall"
  },
  {
    id: 4,
    title: "Midweek Worship Session",
    category: "worship",
    youtubeId: "PdHU1hG_n8M",
    thumbnail: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?auto=format&fit=crop&q=85",
    description: "A special midweek worship session with the team",
    duration: "45:15",
    date: "Sep 12, 2023",
    views: "945",
    featured: false,
    tags: ['worship', 'midweek', 'praise'],
    location: "Chapel"
  }
];

// Video Categories (same as frontend)
const VIDEO_CATEGORIES = [
  { id: 'all', name: 'All Videos' },
  { id: 'worship', name: 'Live Worship' },
  { id: 'performances', name: 'Performances' },
  { id: 'behind-scenes', name: 'Behind the Scenes' }
];

export default function VideoAdminPage() {
  const [videoData, setVideoData] = useState(INITIAL_VIDEO_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [deletingVideo, setDeletingVideo] = useState<any>(null);

  // New video form initial state
  const emptyVideoForm = {
    id: Date.now(),
    title: "",
    category: "worship",
    youtubeId: "",
    thumbnail: "",
    description: "",
    duration: "",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    views: "0",
    featured: false,
    tags: [],
    location: ""
  };

  // Filtered videos based on search and category
  const filteredVideos = videoData.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle adding new video
  const handleAddVideo = () => {
    setCurrentVideo(emptyVideoForm);
    setIsAddingVideo(true);
    setIsEditingVideo(false);
    setTagsInput('');
  };

  // Handle editing existing video
  const handleEditVideo = (video: any) => {
    setCurrentVideo({...video});
    setIsEditingVideo(true);
    setIsAddingVideo(false);
    setImageUrl(video.thumbnail);
    setTagsInput(Array.isArray(video.tags) ? video.tags.join(', ') : '');
  };

  // Handle deleting video
  const handleDeleteVideo = (id: number) => {
    const videoToDelete = videoData.find(video => video.id === id);
    if (videoToDelete) {
      setDeletingVideo(videoToDelete);
    }
  };

  const confirmDelete = () => {
    if (deletingVideo) {
      setVideoData(videoData.filter(video => video.id !== deletingVideo.id));
      setDeletingVideo(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentVideo({ ...currentVideo, [name]: checked });
    } else {
      setCurrentVideo({ ...currentVideo, [name]: value });
    }
  };

  // Handle tags input change
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  // Handle image URL submission
  const handleImageUrlSubmit = () => {
    if (!imageUrl.trim()) return;
    setCurrentVideo({ ...currentVideo, thumbnail: imageUrl });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process tags
    const processedTags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const videoToSave = {
      ...currentVideo,
      tags: processedTags
    };
    
    if (isAddingVideo) {
      // Add new video
      setVideoData([...videoData, videoToSave]);
    } else if (isEditingVideo) {
      // Update existing video
      setVideoData(videoData.map(video => 
        video.id === currentVideo.id ? videoToSave : video
      ));
    }
    
    // Reset form
    setIsAddingVideo(false);
    setIsEditingVideo(false);
    setCurrentVideo(null);
    setImageUrl('');
    setTagsInput('');
  };

  // Cancel form
  const handleCancel = () => {
    setIsAddingVideo(false);
    setIsEditingVideo(false);
    setCurrentVideo(null);
    setImageUrl('');
    setTagsInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center glass-effect rounded-xl p-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Video Management</h1>
          <p className="text-sm text-gray-400">Add, edit, and manage your video collection</p>
        </div>
        <button
          onClick={handleAddVideo}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2" />
          Add New Video
        </button>
      </div>

      {/* Search and Filter */}
      {!isAddingVideo && !isEditingVideo && (
        <div className="glass-effect rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              />
            </div>
            <div className="relative w-full md:w-64">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-gray-800/90 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white appearance-none font-medium"
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              >
                {VIDEO_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-800 text-white py-1">{category.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Video Form */}
      {(isAddingVideo || isEditingVideo) && currentVideo && (
        <div className="glass-effect rounded-xl p-4">
          <h2 className="text-lg font-medium text-white mb-4">
            {isAddingVideo ? 'Add New Video' : 'Edit Video'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentVideo.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={currentVideo.category}
                    onChange={handleInputChange}
                    placeholder="e.g. worship, performances, behind-scenes"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a category or use one of the suggested: worship, performances, behind-scenes
                  </p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentVideo.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white resize-none"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={currentVideo.duration}
                      onChange={handleInputChange}
                      placeholder="e.g. 15:30"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      style={{ fontFamily: 'Titillium Web, sans-serif' }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                      Release Date
                    </label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={currentVideo.date}
                      onChange={handleInputChange}
                      placeholder="e.g. Jan 15, 2024"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      style={{ fontFamily: 'Titillium Web, sans-serif' }}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={currentVideo.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Main Sanctuary"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={currentVideo.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                    Featured Video
                  </label>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="youtubeId" className="block text-sm font-medium text-gray-300 mb-1">
                    YouTube ID
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 bg-white/10 border border-r-0 border-white/10 rounded-l-lg text-gray-400">
                      <FaYoutube />
                    </span>
                    <input
                      type="text"
                      id="youtubeId"
                      name="youtubeId"
                      value={currentVideo.youtubeId}
                      onChange={handleInputChange}
                      placeholder="e.g. dQw4w9WgXcQ"
                      className="flex-grow px-4 py-2 bg-white/5 border border-white/10 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      style={{ fontFamily: 'Titillium Web, sans-serif' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    The ID from the YouTube URL (e.g., youtube.com/watch?v=<span className="text-blue-400">dQw4w9WgXcQ</span>)
                  </p>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tagsInput}
                    onChange={handleTagsChange}
                    placeholder="e.g. worship, live, concert (comma separated)"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate tags with commas
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thumbnail Image
                  </label>
                  
                  <div className="flex space-x-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setImageInputType('upload')}
                      className={`px-3 py-1 rounded ${imageInputType === 'upload' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputType('url')}
                      className={`px-3 py-1 rounded ${imageInputType === 'url' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}
                    >
                      Image URL
                    </button>
                  </div>
                  
                  {imageInputType === 'upload' ? (
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="thumbnail-upload"
                        // onChange would handle file upload in a real implementation
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <FaVideo className="text-3xl text-gray-400 mb-2" />
                        <span className="text-sm text-gray-300">Click to upload image</span>
                        <span className="text-xs text-gray-500 mt-1">(Max size: 800KB)</span>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex">
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Enter image URL"
                          className="flex-grow px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                          style={{ fontFamily: 'Titillium Web, sans-serif' }}
                        />
                        <button
                          type="button"
                          onClick={handleImageUrlSubmit}
                          className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {currentVideo.thumbnail && (
                    <div className="mt-2">
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <Image
                          src={currentVideo.thumbnail}
                          alt={currentVideo.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
              >
                <FaSave className="mr-2" />
                {isAddingVideo ? 'Add Video' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Video List */}
      {!isAddingVideo && !isEditingVideo && (
        <div className="glass-effect rounded-xl p-4">
          <h2 className="text-lg font-medium text-white mb-4">Video Library</h2>
          
          {filteredVideos.length === 0 ? (
            <div className="text-center py-8">
              <FaVideo className="text-4xl text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No videos found. Add some videos to your collection!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Video</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Views</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-16 flex-shrink-0 rounded overflow-hidden relative">
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                              <FaPlay className="text-white" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-white">{video.title}</div>
                            <div className="text-xs text-gray-400 truncate max-w-xs">{video.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                          {VIDEO_CATEGORIES.find(c => c.id === video.category)?.name || video.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{video.duration}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{video.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{video.views}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditVideo(video)}
                            className="p-1 text-blue-400 hover:text-blue-300"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteVideo(video.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                          <a
                            href={`https://youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-400 hover:text-gray-300"
                            title="Watch on YouTube"
                          >
                            <FaPlay />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingVideo && (
        <DeleteConfirmationModal
          title="Delete Video"
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingVideo(null)}
        />
      )}
    </div>
  );
} 