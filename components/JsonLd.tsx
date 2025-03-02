'use client';

import { useEffect } from 'react';

interface JsonLdProps {
  data: string;
}

/**
 * Component for rendering JSON-LD structured data in the head of the page
 * 
 * @param data JSON-LD structured data as a string
 */
export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = data;
    
    // Add to head
    document.head.appendChild(script);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
  
  // This component doesn't render anything
  return null;
} 