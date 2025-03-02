'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import type { Navigation } from '@/lib/supabase';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

export default function NavigationManager() {
  const [navItems, setNavItems] = useState<Navigation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Navigation | null>(null);
  const [deletingItem, setDeletingItem] = useState<Navigation | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    parent_id: null as number | null,
  });

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    try {
      const { data, error } = await supabase
        .from('navigation')
        .select('*')
        .order('order');
      
      if (error) throw error;
      setNavItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('navigation')
          .update({
            title: formData.title,
            path: formData.path,
            parent_id: formData.parent_id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('navigation')
          .insert([
            {
              title: formData.title,
              path: formData.path,
              parent_id: formData.parent_id,
              order: navItems.length,
              is_active: true,
            },
          ]);

        if (error) throw error;
      }

      setFormData({ title: '', path: '', parent_id: null });
      setEditingItem(null);
      await fetchNavItems();
    } catch (error) {
      console.error('Error saving navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('navigation')
        .delete()
        .eq('id', deletingItem.id);

      if (error) throw error;
      await fetchNavItems();
    } catch (error) {
      console.error('Error deleting navigation:', error);
    } finally {
      setLoading(false);
      setDeletingItem(null);
    }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    const currentIndex = navItems.findIndex(item => item.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === navItems.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newItems = [...navItems];
    
    // Type-safe array swapping
    const currentItem = newItems[currentIndex];
    const swapItem = newItems[newIndex];
    
    if (currentItem && swapItem) {
      newItems[currentIndex] = swapItem;
      newItems[newIndex] = currentItem;
    }

    try {
      setLoading(true);
      const updates = newItems.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      const { error } = await supabase
        .from('navigation')
        .upsert(updates);

      if (error) throw error;
      await fetchNavItems();
    } catch (error) {
      console.error('Error reordering navigation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-[#1a2642] p-6 rounded-xl border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#151F32] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Path</label>
            <input
              type="text"
              value={formData.path}
              onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              className="w-full bg-[#151F32] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Parent Item (Optional)</label>
          <select
            value={formData.parent_id || ''}
            onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })}
            className="w-full bg-[#151F32] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">None</option>
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-end">
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setFormData({ title: '', path: '', parent_id: null });
              }}
              className="mr-4 px-6 py-2.5 text-gray-400 hover:text-white transition-all duration-200 text-[15px] hover:bg-gray-800/50 rounded-lg"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-[15px] flex items-center font-medium disabled:opacity-50"
          >
            <FaPlus size={15} className="mr-2" />
            {editingItem ? 'Update' : 'Add'} Navigation Item
          </button>
        </div>
      </form>

      <div className="bg-[#1a2642] rounded-xl border border-gray-800">
        <div className="p-6">
          <h2 className="text-lg font-titillium font-semibold text-white mb-4">Navigation Items</h2>
          <div className="space-y-4">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#151F32] rounded-lg border border-gray-800"
              >
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.path}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleReorder(item.id, 'up')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    disabled={navItems.indexOf(item) === 0}
                  >
                    <FaArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => handleReorder(item.id, 'down')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    disabled={navItems.indexOf(item) === navItems.length - 1}
                  >
                    <FaArrowDown size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setFormData({
                        title: item.title,
                        path: item.path,
                        parent_id: item.parent_id,
                      });
                    }}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => setDeletingItem(item)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {deletingItem && (
        <DeleteConfirmationModal
          title="Delete Navigation Item"
          message="Are you sure you want to delete this navigation item?"
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
} 