import type { UnitType } from '@/enums/unit-type';

export type RawMaterialFormData = {
  code: string;
  name: string;
  stockQuantity: number;
  unitType: UnitType;
};
