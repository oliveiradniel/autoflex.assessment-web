export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
