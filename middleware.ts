import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Check if the path is for the admin area
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // Check for session in cookies
    const adminSession = request.cookies.get('admin-session')?.value;
    
    // If no session, redirect to login
    if (!adminSession) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
    
    try {
      // Parse the session to verify it's valid
      const session = JSON.parse(adminSession);
      
      // Check if session has expired
      if (session.expires_at && new Date(session.expires_at) < new Date()) {
        // Session expired, redirect to login
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', path);
        url.searchParams.set('expired', 'true');
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // Invalid session format, redirect to login
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', path);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
}; 