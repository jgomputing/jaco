"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { RealtimeProvider } from "@/components/RealtimeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      <SessionProvider>
        <RealtimeProvider>
          {children}
        </RealtimeProvider>
      </SessionProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#151F32',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
} 