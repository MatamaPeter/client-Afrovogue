import React from 'react';
import { FiX } from 'react-icons/fi';

const SizeGuide = ({ open, onClose }) => {
  if (!open) return null;

  const sizeData = [
    { size: 'XS', chest: '32-34"', waist: '24-26"', hip: '34-36"' },
    { size: 'S', chest: '34-36"', waist: '26-28"', hip: '36-38"' },
    { size: 'M', chest: '36-38"', waist: '28-30"', hip: '38-40"' },
    { size: 'L', chest: '38-40"', waist: '30-32"', hip: '40-42"' },
    { size: 'XL', chest: '40-42"', waist: '32-34"', hip: '42-44"' },
    { size: 'XXL', chest: '42-44"', waist: '34-36"', hip: '44-46"' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Size Guide</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close size guide"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to measure</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Use a tape measure to take the following measurements. Wear light clothing and keep the tape snug but not tight.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Size</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Chest</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Waist</th>
                  <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sizeData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.size}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.chest}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.waist}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Note: Sizes may vary slightly depending on the style and fabric of the garment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;