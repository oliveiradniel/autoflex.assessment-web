import type { Product } from '@/entities/product';
import type { ProductCreateData } from '@/schemas/product/product-create-schema';
import type { ProductUpdateData } from '@/schemas/product/product-update-schema';
import type { ProductSummary } from '@/types/product-summary';

export abstract class IProductsService {
  abstract list(): Promise<Product[]>;

  abstract findById(id: string): Promise<Product>;

  abstract getSummary(): Promise<ProductSummary>;

  abstract create(product: ProductCreateData): Promise<Product>;

  abstract partialUpdate(
    id: string,
    product: ProductUpdateData,
  ): Promise<Product>;

  abstract delete(id: string): Promise<void>;
}
