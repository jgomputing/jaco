import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  itemToDelete: {
    name: string;
    description?: string;
    image?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  title,
  message,
  itemToDelete,
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#151F32] rounded-lg p-6 w-full max-w-md border border-gray-700 animate-fade-in">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mr-4">
            <FaExclamationTriangle className="text-red-500" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <p className="text-sm text-gray-400 mt-1">{message}</p>
          </div>
        </div>
        
        {(itemToDelete.name || itemToDelete.image) && (
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              {itemToDelete.image && (
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 mr-3">
                  <Image
                    src={itemToDelete.image}
                    alt={itemToDelete.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-white">{itemToDelete.name}</div>
                {itemToDelete.description && (
                  <div className="text-xs text-gray-400">{itemToDelete.description}</div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm flex items-center"
          >
            <FaTrash size={14} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 