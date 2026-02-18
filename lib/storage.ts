import { CareerData, Organization, Position, EventNode } from '@/types/career';

const STORAGE_KEY = 'career-resonance-map-data';

export function loadCareerData(): CareerData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading career data:', error);
  }

  return getDefaultData();
}

export function saveCareerData(data: CareerData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving career data:', error);
  }
}

export function getDefaultData(): CareerData {
  return {
    unitType: 'age',
    organizations: [
      {
        id: 'org_1',
        name: 'First Company',
        range: '22-25',
        positions: [
          {
            id: 'p1',
            title: 'Software Engineer',
            val: 22,
            note: 'Started my career here',
            eventTree: {
              id: 'root_1',
              type: 'root',
              val: 22,
              note: 'Career start',
              left: {
                id: 'trauma_1',
                type: 'trauma',
                val: 23,
                note: 'Difficult project deadline',
              },
              right: {
                id: 'positive_1',
                type: 'positive',
                val: 24,
                note: 'Promoted to senior role',
              },
            },
          },
        ],
      },
    ],
  };
}

export function calculateOrgRange(positions: Position[], unitType: 'age' | 'date'): string {
  if (positions.length === 0) return '';

  const values = positions.map((p) => p.val);
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (unitType === 'age') {
    return `${min}-${max}`;
  } else {
    return `${min}-${max}`;
  }
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
