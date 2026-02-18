'use client';

import { Organization, UnitType } from '@/types/career';
import { motion } from 'framer-motion';
import { Building2, Plus } from 'lucide-react';
import PositionNode from './PositionNode';
import { calculateOrgRange, generateId } from '@/lib/storage';

interface OrganizationNodeProps {
  organization: Organization;
  unitType: UnitType;
  onUpdate: (org: Organization) => void;
}

export default function OrganizationNode({
  organization,
  unitType,
  onUpdate,
}: OrganizationNodeProps) {
  const range = calculateOrgRange(organization.positions, unitType);

  const addPosition = () => {
    const newPosition = {
      id: generateId('pos'),
      title: 'New Position',
      val: unitType === 'age' ? 25 : 2024,
      note: '',
      eventTree: {
        id: generateId('root'),
        type: 'root' as const,
        val: unitType === 'age' ? 25 : 2024,
        note: '',
      },
    };

    onUpdate({
      ...organization,
      positions: [...organization.positions, newPosition],
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="flex flex-col gap-4"
    >
      {/* Organization Header */}
      <motion.div
        layout
        className="bg-white rounded-xl shadow-md p-6 min-w-[280px] border-2 border-gray-200"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Building2 className="w-6 h-6 text-gray-700" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={organization.name}
              onChange={(e) =>
                onUpdate({ ...organization, name: e.target.value })
              }
              className="font-semibold text-lg text-gray-900 bg-transparent border-none outline-none w-full"
              placeholder="Organization name"
            />
            <div className="text-sm text-gray-500 mt-1">
              {range && (
                <span>
                  {range} {unitType === 'age' ? 'years old' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Positions */}
      <div className="flex flex-col gap-6 ml-8">
        {organization.positions.map((position, index) => (
          <PositionNode
            key={position.id}
            position={position}
            unitType={unitType}
            onUpdate={(updatedPos) => {
              const newPositions = [...organization.positions];
              newPositions[index] = updatedPos;
              onUpdate({ ...organization, positions: newPositions });
            }}
            onDelete={() => {
              const newPositions = organization.positions.filter(
                (_, i) => i !== index
              );
              onUpdate({ ...organization, positions: newPositions });
            }}
          />
        ))}

        {/* Add Position Button */}
        <motion.button
          layout
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addPosition}
          className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Position</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
