import type { UnitType } from '@/enums/unit-type';

type RawMaterialInfo = {
  rawMaterialId: string;
  rawMaterialCode: string;
  rawMaterialName: string;
  rawMaterialUnitType: UnitType;
  requiredQuantity: number;
  initialStock: number;
  consumedQuantity: number;
  remainingStock: number;
};

export interface ProductionReport {
  productId: string;
  productCode: string;
  productName: string;
  produceQuantity: number;
  totalValue: number;
  rawMaterials: RawMaterialInfo[];
}
