'use client';

import React, { useState } from 'react';
import { FaPlay, FaSpotify, FaYoutube, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaSave, FaTimes, FaMusic, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import toast from 'react-hot-toast';
import { compressImage, validateImage } from '@/lib/utils/imageCompression';

interface Music {
  id: number;
  title: string;
  artist: string;
  cover_art: string;
  release_date: string;
  genre: string;
  status: 'published' | 'draft';
  spotify_url?: string;
  apple_music_url?: string;
}

// Music Categories (same as frontend)
const MUSIC_CATEGORIES = [
  { id: 'all', name: 'All Music' },
  { id: 'worship', name: 'Worship' },
  { id: 'gospel', name: 'Gospel' },
  { id: 'albums', name: 'Albums' }
];

export default function MusicAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddingMusic, setIsAddingMusic] = useState(false);
  const [isEditingMusic, setIsEditingMusic] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<Music | null>(null);
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [deletingMusic, setDeletingMusic] = useState<Music | null>(null);
  const [music, setMusic] = useState<Music[]>([]);

  // New music form initial state
  const emptyMusicForm: Music = {
    id: Date.now(),
    title: "",
    artist: "",
    cover_art: "",
    release_date: "",
    genre: "worship",
    status: "published"
  };

  // Filtered music based on search and category
  const filteredMusic = music.filter(music => {
    const matchesSearch = music.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         music.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || music.genre === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle adding new music
  const handleAddMusic = () => {
    setCurrentMusic(emptyMusicForm);
    setIsAddingMusic(true);
    setIsEditingMusic(false);
  };

  // Handle editing existing music
  const handleEditMusic = (music: Music) => {
    setCurrentMusic(music);
    setIsEditingMusic(true);
    setIsAddingMusic(false);
    setImageUrl(music.cover_art);
  };

  // Handle deleting music
  const handleDeleteMusic = async (id: number) => {
    try {
      setIsLoading(true);
      setDeletingMusic(music.find(m => m.id === id) || null);
      // Implement delete logic here
      toast.success('Music deleted successfully');
    } catch (error) {
      toast.error('Failed to delete music');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    if (deletingMusic) {
      setMusic(music.filter(m => m.id !== deletingMusic.id));
      setDeletingMusic(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCurrentMusic({ ...currentMusic!, [name]: checked });
    } else {
      setCurrentMusic({ ...currentMusic!, [name]: value });
    }
  };

  // Handle image URL submission
  const handleImageUrlSubmit = () => {
    if (!imageUrl.trim()) return;
    setCurrentMusic({ ...currentMusic!, cover_art: imageUrl });
  };

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    try {
      // Validate the image
      validateImage(file);

      // Compress the image
      const compressedFile = await compressImage(file);

      // Create object URL for preview
      const previewUrl = URL.createObjectURL(compressedFile);
      
      // Update the current music state with the compressed image
      setCurrentMusic({ 
        ...currentMusic!, 
        cover_art: previewUrl 
      });

      // Store the compressed file for later upload
      // You would typically upload this to your storage service here
      
      toast.success('Image compressed and ready for upload');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process image');
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAddingMusic) {
      // Add new music
      setMusic([...music, currentMusic!]);
    } else if (isEditingMusic) {
      // Update existing music
      setMusic(music.map(m => 
        m.id === currentMusic!.id ? currentMusic! : m
      ));
    }
    
    // Reset form
    setIsAddingMusic(false);
    setIsEditingMusic(false);
    setCurrentMusic(null);
    setImageUrl('');
  };

  // Cancel form
  const handleCancel = () => {
    setIsAddingMusic(false);
    setIsEditingMusic(false);
    setCurrentMusic(null);
    setImageUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center glass-effect rounded-xl p-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Music Management</h1>
          <p className="text-sm text-gray-400">Add, edit, and manage your music collection</p>
        </div>
        <button
          onClick={handleAddMusic}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2" />
          Add New Music
        </button>
      </div>

      {/* Search and Filter */}
      {!isAddingMusic && !isEditingMusic && (
        <div className="glass-effect rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search music..."
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
                {MUSIC_CATEGORIES.map(category => (
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

      {/* Add/Edit Music Form */}
      {(isAddingMusic || isEditingMusic) && currentMusic && (
        <div className="glass-effect rounded-xl p-4">
          <h2 className="text-lg font-medium text-white mb-4">
            {isAddingMusic ? 'Add New Music' : 'Edit Music'}
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
                    value={currentMusic.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label htmlFor="artist" className="block text-sm font-medium text-gray-300 mb-1">
                    Artist
                  </label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={currentMusic.artist}
                    onChange={handleInputChange}
                    placeholder="e.g. Artist Name"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
                    Genre
                  </label>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={currentMusic.genre}
                    onChange={handleInputChange}
                    placeholder="e.g. Gospel"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div>
                  <label htmlFor="release_date" className="block text-sm font-medium text-gray-300 mb-1">
                    Release Date
                  </label>
                  <input
                    type="text"
                    id="release_date"
                    name="release_date"
                    value={currentMusic.release_date}
                    onChange={handleInputChange}
                    placeholder="e.g. 2024-03-01"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    style={{ fontFamily: 'Titillium Web, sans-serif' }}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={currentMusic.status === "published"}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="status" className="ml-2 text-sm font-medium text-gray-300">
                    Published
                  </label>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="cover_art" className="block text-sm font-medium text-gray-300 mb-1">
                    Cover Art
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
                        id="cover_art-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        }}
                      />
                      <label
                        htmlFor="cover_art-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <FaMusic className="text-3xl text-gray-400 mb-2" />
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
                  
                  {currentMusic.cover_art && (
                    <div className="mt-2">
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <Image
                          src={currentMusic.cover_art}
                          alt={currentMusic.title}
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
                {isAddingMusic ? 'Add Music' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Music List */}
      {!isAddingMusic && !isEditingMusic && (
        <div className="glass-effect rounded-xl p-4">
          <h2 className="text-lg font-medium text-white mb-4">Music Library</h2>
          
          {filteredMusic.length === 0 ? (
            <div className="text-center py-8">
              <FaMusic className="text-4xl text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">No music found. Add some music to your collection!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMusic.map((track) => (
                <div key={track.id} className="bg-[#151F32] rounded-xl p-4 hover:bg-[#1a2744] transition-colors">
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={track.cover_art}
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{track.title}</h3>
                    <p className="text-gray-400">{track.artist}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        track.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {track.status}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                        {track.genre}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEditMusic(track)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteMusic(track.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          disabled={isLoading}
                        >
                          {isLoading ? <FaSpinner className="animate-spin" size={16} /> : <FaTrash size={16} />}
                        </button>
                      </div>
                      <p className="text-sm text-gray-400">{new Date(track.release_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMusic && (
        <DeleteConfirmationModal
          title="Delete Music"
          message="This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingMusic(null)}
        />
      )}
    </div>
  );
} 