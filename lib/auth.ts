'use client';

import type { User, AuthResponse } from '@/types/user';

// Simple in-memory session storage
let currentSession: any = null;

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    console.log('Attempting login with email:', email);
    
    // Hardcoded admin credentials
    if (email === 'admin@jacoosijaye.com' && password === 'Admin@2024') {
      // Create a session
      const user: User = {
        id: '1',
        email: 'admin@jacoosijaye.com',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        avatar_url: '',
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const session = {
        user,
        token: 'fake-token-' + Math.random().toString(36).substring(2),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      };
      
      // Store the session
      currentSession = session;
      
      // Store in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-session', JSON.stringify(session));
      }
      
      console.log('Login successful, session:', session);
      return { session, error: null };
    }
    
    console.error('Invalid login credentials');
    return { session: null, error: 'Invalid login credentials' };
  } catch (error: any) {
    console.error('Unexpected login error:', error);
    return { session: null, error: error.message || 'An unexpected error occurred' };
  }
}

export async function logout() {
  try {
    // Clear the session
    currentSession = null;
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-session');
    }
    
    return { error: null };
  } catch (error: any) {
    console.error('Unexpected logout error:', error);
    return { error: error.message || 'An unexpected error occurred' };
  }
}

export async function getSession() {
  try {
    // Check memory first
    if (currentSession) {
      return currentSession;
    }
    
    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('admin-session');
      if (storedSession) {
        currentSession = JSON.parse(storedSession);
        return currentSession;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function getUser() {
  try {
    const session = await getSession();
    return session?.user || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function isAdmin() {
  try {
    const user = await getUser();
    const isUserAdmin = user?.role === 'admin';
    console.log('Is user admin?', isUserAdmin);
    return isUserAdmin;
  } catch (error) {
    console.error('Check admin error:', error);
    return false;
  }
}

export async function checkAuth() {
  try {
    const session = await getSession();
    const hasSession = !!session;
    console.log('Has active session?', hasSession);
    return hasSession;
  } catch (error) {
    console.error('Check auth error:', error);
    return false;
  }
}