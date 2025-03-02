"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Content", href: "/admin/content", icon: DocumentTextIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                {sidebarOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
              <Link href="/admin" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Admin Panel
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                      isActive ? "bg-gray-100" : ""
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${
                        isActive ? "text-indigo-600" : "text-gray-500"
                      }`}
                    />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
} 