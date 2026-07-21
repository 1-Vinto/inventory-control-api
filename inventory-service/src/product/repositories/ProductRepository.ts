import { Product } from "../Product.js";

export interface ProductRepository {
  save(product: Product): void;
  findAll(): Product[];
  findBySku(sku: string): Product | undefined;
  update(product: Product): void;
  delete(sku: string): void;
}