export const UnitType = {
  KG: 'Kilogram',
  G: 'Gram',
  L: 'Litre',
  ML: 'Millilitre',
  UNIT: 'Unit',
  PACK: 'Pack',
  BOX: 'Box',
  ROLL: 'Roll',
  SHEET: 'Sheet',
  M: 'Meter',
  CM: 'Centimeter',
} as const;

export type UnitType = (typeof UnitType)[keyof typeof UnitType];
