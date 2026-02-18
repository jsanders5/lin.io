'use client';

import { UnitType } from '@/types/career';
import { motion } from 'framer-motion';

interface UnitToggleProps {
  unitType: UnitType;
  onToggle: () => void;
}

export default function UnitToggle({ unitType, onToggle }: UnitToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 right-6 z-50 bg-white shadow-lg rounded-lg p-1 flex gap-1"
    >
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          unitType === 'age'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Age
      </button>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          unitType === 'date'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Date
      </button>
    </motion.div>
  );
}
