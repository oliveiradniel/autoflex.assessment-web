export type ProductFormData = {
  code: string;
  name: string;
  price: number;
  description?: string;
  materials?: {
    rawMaterialId: string;
    quantityNeeded: number;
  }[];
  isActive: boolean;
};
