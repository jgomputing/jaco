import { Metadata } from 'next';
import NavigationManager from '@/components/admin/NavigationManager';

export const metadata: Metadata = {
  title: 'Navigation Management | Admin Panel',
  description: 'Manage website navigation links',
};

export default function NavigationPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-titillium font-bold text-white mb-2">Navigation Management</h1>
        <p className="text-gray-400">Manage and organize your website&apos;s navigation structure</p>
      </div>
      <NavigationManager />
    </div>
  );
} 