export const UnitType = {
  KG: 'KG',
  G: 'G',
  L: 'L',
  ML: 'ML',
  UNIT: 'UNIT',
  PACK: 'PACK',
  BOX: 'BOX',
  ROLL: 'ROLL',
  SHEET: 'SHEET',
  M: 'M',
  CM: 'CM',
} as const;

export type UnitType = (typeof UnitType)[keyof typeof UnitType];
