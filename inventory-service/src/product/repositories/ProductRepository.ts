import { Product } from "../Product.js";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findAll(): Promise<Product[]>;
  findBySku(sku: string): Promise<Product | undefined>;
  update(product: Product): Promise<void>;
  delete(sku: string): Promise<void>;
}