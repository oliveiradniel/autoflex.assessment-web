import { ProductsService } from '../services/products-service';

import { makeHttpClient } from './make-auth-service';

import type { IProductsService } from '../contracts/iproducts-service';

export function makeProductsService(): IProductsService {
  return new ProductsService(makeHttpClient());
}
