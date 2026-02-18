'use client';

import { useState, useRef, useEffect } from 'react';
import { CareerData } from '@/types/career';
import { motion } from 'framer-motion';
import OrganizationNode from './OrganizationNode';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface CanvasProps {
  careerData: CareerData;
  setCareerData: (data: CareerData) => void;
}

export default function Canvas({ careerData, setCareerData }: CanvasProps) {
  const [pan, setPan] = useState({ x: 100, y: 100 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.1, Math.min(3, prev * delta)));
  };

  const zoomIn = () => setZoom((prev) => Math.min(3, prev * 1.2));
  const zoomOut = () => setZoom((prev) => Math.max(0.1, prev / 1.2));
  const resetView = () => {
    setZoom(1);
    setPan({ x: 100, y: 100 });
  };

  return (
    <div className="relative w-full h-full">
      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-50 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={resetView}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          background: 'radial-gradient(circle, #f0f0f0 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      >
        <motion.div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
          className="relative"
        >
          <div className="flex gap-16">
            {careerData.organizations.map((org, index) => (
              <OrganizationNode
                key={org.id}
                organization={org}
                unitType={careerData.unitType}
                onUpdate={(updatedOrg) => {
                  const newOrgs = [...careerData.organizations];
                  newOrgs[index] = updatedOrg;
                  setCareerData({ ...careerData, organizations: newOrgs });
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
