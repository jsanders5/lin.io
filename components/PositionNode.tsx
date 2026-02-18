'use client';

import { Position, UnitType } from '@/types/career';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EventTree from './EventTree';

interface PositionNodeProps {
  position: Position;
  unitType: UnitType;
  onUpdate: (pos: Position) => void;
  onDelete: () => void;
}

export default function PositionNode({
  position,
  unitType,
  onUpdate,
  onDelete,
}: PositionNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div layout className="flex flex-col gap-4">
      {/* Position Card */}
      <motion.div
        layout
        className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 min-w-[240px]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-1.5 bg-gray-100 rounded">
              <Briefcase className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={position.title}
                onChange={(e) =>
                  onUpdate({ ...position, title: e.target.value })
                }
                className="font-medium text-gray-900 bg-transparent border-none outline-none w-full"
                placeholder="Position title"
              />
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={position.val}
                  onChange={(e) =>
                    onUpdate({ ...position, val: Number(e.target.value) })
                  }
                  className="text-sm text-gray-600 bg-transparent border-none outline-none w-16"
                />
                <span className="text-sm text-gray-500">
                  {unitType === 'age' ? 'yrs' : ''}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={onDelete}
              className="p-1 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Note */}
        <input
          type="text"
          value={position.note}
          onChange={(e) => onUpdate({ ...position, note: e.target.value })}
          className="mt-2 text-sm text-gray-600 bg-transparent border-none outline-none w-full"
          placeholder="Add a note..."
        />
      </motion.div>

      {/* Event Tree */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="ml-8"
          >
            <EventTree
              eventNode={position.eventTree}
              unitType={unitType}
              onUpdate={(updatedTree) => {
                onUpdate({ ...position, eventTree: updatedTree });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
