import type { Product } from '@/entities/product';

import type { ProductCreateData } from '@/schemas/product/product-create-schema';
import type { ProductUpdateData } from '@/schemas/product/product-update-schema';

import type { IHttpClient } from '../contracts/ihttp-client';
import type { IProductsService } from '../contracts/iproducts-service';
import type { ProductSummary } from '@/types/ProductSummary';

export class ProductsService implements IProductsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(): Promise<Product[]> {
    const products = this.httpClient.get<Product[]>('/products');

    return products;
  }

  findById(id: string): Promise<Product> {
    const product = this.httpClient.get<Product>(`/products/${id}`);

    return product;
  }

  getSummary(): Promise<ProductSummary> {
    const productSummary =
      this.httpClient.get<ProductSummary>(`/products/summary`);

    return productSummary;
  }

  create(product: ProductCreateData): Promise<Product> {
    const createdProduct = this.httpClient.post<Product>('/products', product);

    return createdProduct;
  }

  partialUpdate(id: string, product: ProductUpdateData): Promise<Product> {
    const updatedProduct = this.httpClient.patch<Product>(
      `/products/${id}`,
      product,
    );

    return updatedProduct;
  }

  delete(id: string): Promise<void> {
    return this.httpClient.delete(`/products/${id}`);
  }
}
