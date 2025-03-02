'use client';

import React, { useState, useRef } from 'react';
import { FaSave, FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaQuoteRight, FaCode, FaLink, FaImage, 
  FaEdit, FaTrash, FaPlus, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaMusic, FaYoutube, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';

// Sample data for hero slider
const INITIAL_HERO_IMAGES = [
  {
    id: 1,
    title: "Welcome to Jaco Osijaye",
    subtitle: "Gospel Artist, Worship Leader, and Minister",
    imageUrl: "/images/hero/hero-1.jpg",
    buttonText: "Explore Music",
    buttonLink: "/music"
  },
  {
    id: 2,
    title: "Latest Releases",
    subtitle: "Experience worship through music",
    imageUrl: "/images/hero/hero-2.jpg",
    buttonText: "Watch Videos",
    buttonLink: "/videos"
  }
];

// Sample data for artist info
const INITIAL_ARTIST_INFO = {
  name: "Jaco Osijaye",
  title: "Gospel Artist & Worship Leader",
  about: "A passionate gospel artist and worship leader dedicated to spreading God's message through music.",
  mission: "To touch hearts and transform lives through the power of gospel music and worship.",
  vision: "To reach millions globally with uplifting and inspiring gospel music."
};

// Sample data for contact info
const INITIAL_CONTACT_INFO = {
  email: "contact@jacoosijaye.com",
  phone: "Your Contact Number",
  bookingEmail: "bookings@jacoosijaye.com",
  socialMedia: {
    facebook: "https://facebook.com/jacoosijaye",
    instagram: "https://instagram.com/jacoosijaye",
    youtube: "https://youtube.com/jacoosijaye",
    twitter: "@jacoosijaye"
  }
};

export default function SettingsPage() {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // State for managing different sections
  const [heroImages, setHeroImages] = useState(INITIAL_HERO_IMAGES);
  const [artistInfo, setArtistInfo] = useState(INITIAL_ARTIST_INFO);
  const [contactInfo, setContactInfo] = useState(INITIAL_CONTACT_INFO);
  const [currentSection, setCurrentSection] = useState('artist');
  
  // State for editing items
  const [editingHeroImage, setEditingHeroImage] = useState<any>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const saveSettings = async () => {
    setIsSaving(true);
    setSaveMessage({ text: '', type: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSaveMessage({ 
        text: 'Settings saved successfully!', 
        type: 'success' 
      });
    } catch (error) {
      // Error
      setSaveMessage({ 
        text: 'Failed to save settings. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Text formatting functions
  const insertFormatting = (startTag: string, endTag: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);
    
    const newText = beforeText + startTag + selectedText + (endTag || startTag) + afterText;
    setContent(newText);
    
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
      const selectedText = content.substring(start, end);
      const linkText = selectedText || 'link text';
      
      insertFormatting('[' + linkText + '](', ')');
    }
  };
  
  const formatImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertFormatting('![Image](', ')');
    }
  };

  // Hero Slider Management
  const handleAddHeroImage = () => {
    const newImage = {
      id: Date.now(),
      title: "",
      subtitle: "",
      imageUrl: "",
      buttonText: "",
      buttonLink: ""
    };
    setHeroImages([...heroImages, newImage]);
    setEditingHeroImage(newImage);
  };

  const handleUpdateHeroImage = (updatedImage: any) => {
    setHeroImages(heroImages.map(img => 
      img.id === updatedImage.id ? updatedImage : img
    ));
    setEditingHeroImage(null);
  };

  const handleDeleteHeroImage = (id: number) => {
    if (confirm('Are you sure you want to delete this hero image?')) {
      setHeroImages(heroImages.filter(img => img.id !== id));
    }
  };

  // Artist Info Management
  const handleArtistInfoChange = (field: string, value: string) => {
    setArtistInfo({ ...artistInfo, [field]: value });
  };

  // Contact Info Management
  const handleContactInfoChange = (field: string, value: string) => {
    if (field.startsWith('socialMedia.')) {
      const socialField = field.split('.')[1];
      setContactInfo({
        ...contactInfo,
        socialMedia: {
          ...contactInfo.socialMedia,
          [socialField as keyof typeof contactInfo.socialMedia]: value
        }
      });
    } else {
      setContactInfo({ ...contactInfo, [field]: value });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900">
      <Head>
        <title>Jaco Osijaye - Settings</title>
      </Head>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-gray-800/50 rounded-lg p-3 border border-white/10 backdrop-blur-sm">
        <h1 className="text-xl font-semibold text-white" style={{ fontFamily: 'Titillium Web, sans-serif' }}>Settings</h1>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 text-sm"
        >
          <FaSave className="mr-1.5" size={12} />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
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
        {/* Navigation */}
        <div className="col-span-3 bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm h-fit">
          <div className="flex flex-col">
            {[
              { id: 'artist', icon: FaUser, label: 'Artist Info' },
              { id: 'hero', icon: FaImage, label: 'Hero Slider' },
              { id: 'contact', icon: FaEnvelope, label: 'Contact' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setCurrentSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm transition-all duration-200 ${
                  currentSection === id
                    ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-9 bg-gray-800/50 rounded-lg border border-white/10 backdrop-blur-sm p-4">
          {currentSection === 'artist' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={artistInfo.name}
                    onChange={(e) => handleArtistInfoChange('name', e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={artistInfo.title}
                    onChange={(e) => handleArtistInfoChange('title', e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">About</label>
                <textarea
                  value={artistInfo.about}
                  onChange={(e) => handleArtistInfoChange('about', e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Mission</label>
                  <textarea
                    value={artistInfo.mission}
                    onChange={(e) => handleArtistInfoChange('mission', e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm h-20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Vision</label>
                  <textarea
                    value={artistInfo.vision}
                    onChange={(e) => handleArtistInfoChange('vision', e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm h-20"
                  />
                </div>
              </div>
            </div>
          )}

          {currentSection === 'contact' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Contact Email</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 bg-blue-600/20 border border-r-0 border-white/10 rounded-l-md text-blue-400">
                      <FaEnvelope size={12} />
                    </span>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      className="flex-grow px-3 py-1.5 bg-black/20 border border-white/10 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Booking Email</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2 bg-blue-600/20 border border-r-0 border-white/10 rounded-l-md text-blue-400">
                      <FaEnvelope size={12} />
                    </span>
                    <input
                      type="email"
                      value={contactInfo.bookingEmail}
                      onChange={(e) => handleContactInfoChange('bookingEmail', e.target.value)}
                      className="flex-grow px-3 py-1.5 bg-black/20 border border-white/10 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 bg-blue-600/20 border border-r-0 border-white/10 rounded-l-md text-blue-400">
                    <FaPhone size={12} />
                  </span>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                    className="flex-grow px-3 py-1.5 bg-black/20 border border-white/10 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Social Media</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'facebook', icon: FaFacebook },
                    { key: 'instagram', icon: FaInstagram },
                    { key: 'youtube', icon: FaYoutube },
                    { key: 'twitter', icon: FaTwitter }
                  ].map(({ key, icon: Icon }) => (
                    <div key={key}>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 bg-blue-600/20 border border-r-0 border-white/10 rounded-l-md text-blue-400">
                          <Icon size={12} />
                        </span>
                        <input
                          type="text"
                          value={contactInfo.socialMedia[key]}
                          onChange={(e) => handleContactInfoChange(`socialMedia.${key}`, e.target.value)}
                          className="flex-grow px-3 py-1.5 bg-black/20 border border-white/10 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                          placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 'hero' && (
            <>
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={handleAddHeroImage}
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300 text-sm"
                >
                  <FaPlus className="mr-1.5" size={10} />
                  Add Image
                </button>
              </div>
              <div className="space-y-2">
                {heroImages.map((image) => (
                  <div key={image.id} className="flex items-center justify-between bg-black/20 rounded-md p-2 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-20 h-12 rounded overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{image.title}</h3>
                        <p className="text-xs text-gray-400">{image.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setEditingHeroImage(image)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteHeroImage(image.id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingHeroImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg p-4 w-full max-w-md border border-white/10">
            <h3 className="text-md font-medium text-white mb-3">
              {editingHeroImage.id ? 'Edit Hero Image' : 'Add Hero Image'}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={editingHeroImage.title}
                  onChange={(e) => setEditingHeroImage({...editingHeroImage, title: e.target.value})}
                  className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingHeroImage.subtitle}
                  onChange={(e) => setEditingHeroImage({...editingHeroImage, subtitle: e.target.value})}
                  className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingHeroImage.imageUrl}
                  onChange={(e) => setEditingHeroImage({...editingHeroImage, imageUrl: e.target.value})}
                  className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={editingHeroImage.buttonText}
                    onChange={(e) => setEditingHeroImage({...editingHeroImage, buttonText: e.target.value})}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={editingHeroImage.buttonLink}
                    onChange={(e) => setEditingHeroImage({...editingHeroImage, buttonLink: e.target.value})}
                    className="w-full px-3 py-1.5 bg-black/20 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingHeroImage(null)}
                className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateHeroImage(editingHeroImage)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
