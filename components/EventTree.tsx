'use client';

import { EventNode, UnitType } from '@/types/career';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/storage';
import { useState } from 'react';

interface EventTreeProps {
  eventNode: EventNode;
  unitType: UnitType;
  onUpdate: (node: EventNode) => void;
}

export default function EventTree({
  eventNode,
  unitType,
  onUpdate,
}: EventTreeProps) {
  const [showLeftAdd, setShowLeftAdd] = useState(false);
  const [showRightAdd, setShowRightAdd] = useState(false);

  const addLeftChild = () => {
    const newNode: EventNode = {
      id: generateId('trauma'),
      type: 'trauma',
      val: eventNode.val + 1,
      note: '',
    };
    onUpdate({ ...eventNode, left: newNode });
    setShowLeftAdd(false);
  };

  const addRightChild = () => {
    const newNode: EventNode = {
      id: generateId('positive'),
      type: 'positive',
      val: eventNode.val + 1,
      note: '',
    };
    onUpdate({ ...eventNode, right: newNode });
    setShowRightAdd(false);
  };

  const updateLeftChild = (updatedLeft: EventNode) => {
    onUpdate({ ...eventNode, left: updatedLeft });
  };

  const updateRightChild = (updatedRight: EventNode) => {
    onUpdate({ ...eventNode, right: updatedRight });
  };

  const deleteLeftChild = () => {
    const { left, ...rest } = eventNode;
    onUpdate(rest as EventNode);
  };

  const deleteRightChild = () => {
    const { right, ...rest } = eventNode;
    onUpdate(rest as EventNode);
  };

  return (
    <motion.div layout className="flex flex-col gap-4">
      {/* Current Node */}
      <motion.div
        layout
        className={`rounded-lg shadow-sm p-4 border-2 min-w-[200px] ${
          eventNode.type === 'root'
            ? 'bg-gray-50 border-gray-300'
            : eventNode.type === 'trauma'
            ? 'bg-terracotta-50 border-terracotta-300'
            : 'bg-sage-50 border-sage-300'
        }`}
      >
        <div className="flex items-start gap-2">
          {eventNode.type === 'trauma' && (
            <TrendingDown className="w-4 h-4 text-terracotta-600 mt-1" />
          )}
          {eventNode.type === 'positive' && (
            <TrendingUp className="w-4 h-4 text-sage-600 mt-1" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={eventNode.val}
                onChange={(e) =>
                  onUpdate({ ...eventNode, val: Number(e.target.value) })
                }
                className="text-sm font-medium bg-transparent border-none outline-none w-16"
              />
              <span className="text-xs text-gray-500">
                {unitType === 'age' ? 'yrs' : ''}
              </span>
            </div>
            <textarea
              value={eventNode.note}
              onChange={(e) => onUpdate({ ...eventNode, note: e.target.value })}
              className="mt-1 text-sm bg-transparent border-none outline-none w-full resize-none"
              placeholder="Add note..."
              rows={2}
            />
          </div>
        </div>
      </motion.div>

      {/* Children */}
      <div className="flex gap-8 ml-8">
        {/* Left (Trauma) Branch */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {eventNode.left ? (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <button
                  onClick={deleteLeftChild}
                  className="absolute -top-2 -right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
                <EventTree
                  eventNode={eventNode.left}
                  unitType={unitType}
                  onUpdate={updateLeftChild}
                />
              </motion.div>
            ) : (
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addLeftChild}
                className="flex items-center gap-2 px-3 py-2 bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-700 rounded-lg border border-terracotta-300 transition-colors"
              >
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Add Trauma</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right (Positive) Branch */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {eventNode.right ? (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative"
              >
                <button
                  onClick={deleteRightChild}
                  className="absolute -top-2 -right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
                <EventTree
                  eventNode={eventNode.right}
                  unitType={unitType}
                  onUpdate={updateRightChild}
                />
              </motion.div>
            ) : (
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addRightChild}
                className="flex items-center gap-2 px-3 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded-lg border border-sage-300 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Add Growth</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
