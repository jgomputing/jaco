import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  title,
  message,
  onConfirm,
  onCancel
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-[#1a2642] to-[#151F32] rounded-xl p-8 w-full max-w-md border border-gray-800/50 animate-fade-in shadow-2xl">
        <div className="flex items-start mb-8">
          <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mr-5 backdrop-blur">
            <FaExclamationTriangle className="text-red-500 animate-pulse" size={28} />
          </div>
          <div>
            <h3 className="text-xl font-titillium font-semibold text-white tracking-wide mb-2">{title}</h3>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              {message}
              <span className="block mt-1 text-red-400/80 text-sm">This will permanently remove the item.</span>
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 text-gray-400 hover:text-white transition-all duration-200 text-[15px] hover:bg-gray-800/50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-[15px] flex items-center font-medium shadow-lg shadow-red-500/20"
          >
            <FaTrash size={15} className="mr-2 -translate-y-[1px]" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 