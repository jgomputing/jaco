'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Navigation as NavItem } from '@/lib/supabase';

export default function Navigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    try {
      const { data, error } = await supabase
        .from('navigation')
        .select('*')
        .eq('is_active', true)
        .order('order');
      
      if (error) throw error;
      setNavItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const organizeNavItems = (items: NavItem[]) => {
    const mainItems = items.filter(item => !item.parent_id);
    const subItems = items.filter(item => item.parent_id);
    
    return mainItems.map(item => ({
      ...item,
      children: subItems.filter(subItem => subItem.parent_id === item.id)
    }));
  };

  const organizedItems = organizeNavItems(navItems);

  if (loading) {
    return <div className="h-16 bg-[#1a2642] animate-pulse rounded-lg" />;
  }

  return (
    <nav className="bg-[#1a2642] rounded-xl border border-gray-800">
      <ul className="flex flex-col lg:flex-row lg:items-center p-4 gap-2">
        {organizedItems.map((item) => (
          <li key={item.id} className="relative group">
            <Link
              href={item.path}
              className={`
                px-4 py-2 rounded-lg text-[15px] font-titillium font-medium block
                transition-all duration-200
                ${pathname === item.path
                  ? 'text-white bg-blue-600'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              {item.title}
            </Link>
            
            {item.children && item.children.length > 0 && (
              <ul className="
                hidden group-hover:block
                absolute top-full left-0 mt-1
                min-w-[200px]
                bg-[#1a2642] rounded-lg border border-gray-800
                shadow-xl
                z-50
              ">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={child.path}
                      className={`
                        px-4 py-2.5 block text-[15px] font-titillium
                        transition-all duration-200
                        ${pathname === child.path
                          ? 'text-white bg-blue-600'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
} 