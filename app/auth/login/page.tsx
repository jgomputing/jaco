'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/lib/auth';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('admin@jacoosijaye.com');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      console.log('Login attempt with:', email);
      const { session, error } = await login(email, password);
      
      if (error) {
        console.error('Login error:', error);
        setErrorMessage(error);
        toast.error(error);
        setIsLoading(false);
        return;
      }

      if (!session) {
        const msg = 'Login failed - no session returned';
        console.error(msg);
        setErrorMessage(msg);
        toast.error(msg);
        setIsLoading(false);
        return;
      }

      // Store session in cookie for middleware
      document.cookie = `admin-session=${JSON.stringify(session)}; path=/; max-age=86400; SameSite=Strict`;
      
      toast.success('Welcome back!');
      
      // Get the redirect URL from query params or default to admin
      const redirectTo = searchParams?.get('redirect') || '/admin';
      router.push(redirectTo);
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to sign in';
      console.error('Login error:', error);
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#151F32] rounded-2xl p-8 shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200">
              <div className="flex items-center mb-2">
                <FaExclamationTriangle className="text-red-400 mr-2" />
                <span className="font-semibold">Login Failed</span>
              </div>
              <p>{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl 
                    bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl 
                    bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl
                text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Use email: admin@jacoosijaye.com</p>
            <p>Password: Admin@2024</p>
          </div>
        </div>
      </div>
    </div>
  );
} 