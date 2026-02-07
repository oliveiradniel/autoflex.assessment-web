import type { UnitType } from '@/enums/unit-type';

export interface RawMaterial {
  id: string;
  code: string;
  name: string;
  stockQuantity: number;
  unitType: UnitType;
  createdAt: Date;
  updatedAt: Date;
}
