'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('admin@jacoosijaye.com');
  const [password, setPassword] = useState('');
  
  // Get redirect path from URL if available
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const redirectPath = searchParams.get('redirect') || '/admin';
  const sessionExpired = searchParams.get('expired') === 'true';
  
  // Show toast if session expired
  useEffect(() => {
    if (sessionExpired) {
      toast.error('Your session has expired. Please log in again.');
    }
  }, [sessionExpired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Login attempt with:', email);
      const { session, error } = await login(email, password);
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error);
        setIsLoading(false);
        return;
      }

      if (!session) {
        toast.error('Login failed');
        setIsLoading(false);
        return;
      }

      // Store session in cookie for middleware
      document.cookie = `admin-session=${JSON.stringify(session)}; path=/; max-age=86400; SameSite=Strict`;
      
      toast.success('Welcome back!');
      router.push(redirectPath);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#151F32] rounded-2xl p-8 shadow-xl border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>
          
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