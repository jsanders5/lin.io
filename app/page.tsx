'use client';

import { useState, useEffect } from 'react';
import { CareerData } from '@/types/career';
import { loadCareerData, saveCareerData } from '@/lib/storage';
import Canvas from '@/components/Canvas';
import UnitToggle from '@/components/UnitToggle';

export default function Home() {
  const [careerData, setCareerData] = useState<CareerData | null>(null);

  useEffect(() => {
    setCareerData(loadCareerData());
  }, []);

  useEffect(() => {
    if (careerData) {
      saveCareerData(careerData);
    }
  }, [careerData]);

  const toggleUnit = () => {
    if (careerData) {
      setCareerData({
        ...careerData,
        unitType: careerData.unitType === 'age' ? 'date' : 'age',
      });
    }
  };

  if (!careerData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-gray-50">
      <UnitToggle unitType={careerData.unitType} onToggle={toggleUnit} />
      <Canvas careerData={careerData} setCareerData={setCareerData} />
    </main>
  );
}
