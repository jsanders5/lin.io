export type UnitType = 'age' | 'date';

export interface EventNode {
  id: string;
  type: 'root' | 'trauma' | 'positive';
  val: number; // age or date
  note: string;
  left?: EventNode;
  right?: EventNode;
}

export interface Position {
  id: string;
  title: string;
  val: number; // age or date when position started
  note: string;
  eventTree: EventNode;
}

export interface Organization {
  id: string;
  name: string;
  range: string;
  positions: Position[];
}

export interface CareerData {
  unitType: UnitType;
  organizations: Organization[];
}
