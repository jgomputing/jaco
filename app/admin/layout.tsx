'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { logout, checkAuth, getUser } from '@/lib/auth';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { 
  FaHome, FaUsers, FaMusic, FaBlog, FaCog, 
  FaChartBar, FaVideo, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import type { User } from '@/types/user';

// Navigation items
const navItems = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'Users', href: '/admin/users', icon: FaUsers },
  { name: 'Music', href: '/admin/music', icon: FaMusic },
  { name: 'Blog', href: '/admin/blog', icon: FaBlog },
  { name: 'Videos', href: '/admin/videos', icon: FaVideo },
  { name: 'Analytics', href: '/admin/analytics', icon: FaChartBar },
  { name: 'Settings', href: '/admin/settings', icon: FaCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/login');
          return;
        }
        
        const currentUser = await getUser();
        setUser(currentUser);
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication check error:', error);
        router.push('/login');
      }
    };
    
    checkAuthentication();
  }, [router]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      
      // Clear the session cookie
      document.cookie = 'admin-session=; path=/; max-age=0; SameSite=Strict';
      
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to log out');
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#151F32] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Jaco Admin</h2>
            <button 
              className="text-gray-400 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-400">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="px-4 py-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400 mr-3"></div>
                  Logging out...
                </>
              ) : (
                <>
                  <FaSignOutAlt className="mr-3 h-5 w-5" />
                  Sign Out
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-[#151F32] border-b border-gray-800 px-4 py-3 flex items-center lg:hidden">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
          <h1 className="ml-4 text-lg font-medium text-white">Jaco Admin</h1>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 