'use client';

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaSpinner, FaUser, FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { compressImage, validateImage, generateThumbnail } from '@/lib/utils/imageCompression';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor';
  status: 'active' | 'inactive';
  last_login: string;
}

const ROLES = [
  { id: 'all', name: 'All Roles' },
  { id: 'admin', name: 'Admin' },
  { id: 'editor', name: 'Editor' }
];

const STATUS = [
  { id: 'all', name: 'All Status' },
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' }
];

export default function UserManagementPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@jacoosijaye.com',
      avatar: '/images/avatars/admin.jpg',
      role: 'admin',
      status: 'active',
      last_login: '2024-02-20T10:30:00'
    },
    {
      id: 2,
      name: 'Content Editor',
      email: 'editor@jacoosijaye.com',
      avatar: '/images/avatars/editor.jpg',
      role: 'editor',
      status: 'active',
      last_login: '2024-02-19T15:45:00'
    }
  ]);

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = async (id: number) => {
    try {
      setIsLoading(true);
      // Implement delete logic here
      toast.success('User deleted successfully');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setIsLoading(false);
      setDeletingUser(null);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      // Validate the image
      validateImage(file);

      // Generate a small avatar image
      const thumbnail = await generateThumbnail(file);

      // Create object URL for preview
      const avatarUrl = URL.createObjectURL(thumbnail);

      // Update user avatar
      // This would typically be part of your user edit/create form
      setUsers(prev => prev.map(user =>
        user.id === deletingUser!.id ? { ...user, avatar: avatarUrl } : user
      ));

      toast.success('Avatar processed successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process avatar');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center glass-effect rounded-xl p-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
        >
          <FaUserPlus className="mr-2" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              style={{ fontFamily: 'Titillium Web, sans-serif' }}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative w-40">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white appearance-none"
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              >
                {ROLES.map(role => (
                  <option key={role.id} value={role.id} className="bg-gray-800">{role.name}</option>
                ))}
              </select>
            </div>
            <div className="relative w-40">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white appearance-none"
                style={{ fontFamily: 'Titillium Web, sans-serif' }}
              >
                {STATUS.map(status => (
                  <option key={status.id} value={status.id} className="bg-gray-800">{status.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Last Login</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-700">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <FaUser className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                      } mr-2`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(user.last_login).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => {/* Handle edit */}}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingUser(user)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete user"
                        disabled={isLoading}
                      >
                        {isLoading ? <FaSpinner className="animate-spin" size={16} /> : <FaTrash size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <DeleteConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${deletingUser.name}? This action cannot be undone.`}
          onConfirm={() => handleDeleteUser(deletingUser.id)}
          onCancel={() => setDeletingUser(null)}
        />
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-700">
            {deletingUser?.avatar ? (
              <Image
                src={deletingUser.avatar}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <FaUser className="text-gray-400 text-2xl" />
              </div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAvatarUpload(file);
                }
              }}
            />
            <label
              htmlFor="avatar-upload"
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors cursor-pointer inline-block"
            >
              Change Photo
            </label>
            <p className="text-xs text-gray-400 mt-1">Recommended: Square image, max 5MB</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 