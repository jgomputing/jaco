'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Reset scroll position when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={isMounted ? "animate-fadeIn transition-all duration-300 ease-in-out" : ""}>
      {children}
    </div>
  );
} 