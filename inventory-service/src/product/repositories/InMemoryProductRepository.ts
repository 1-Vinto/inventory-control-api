import { Product } from "../Product.js";
import { ProductRepository } from "./ProductRepository.js";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findBySku(sku: string): Promise<Product | undefined> {
    const normalizedSku = sku.trim();
    return this.products.find((product) => product.getSku() === normalizedSku);
  }

  async update(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      (currentProduct) => currentProduct.getSku() === product.getSku(),
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    this.products[productIndex] = product;
  }

  async delete(sku: string): Promise<void> {
    const normalizedSku = sku.trim();
    const productIndex = this.products.findIndex(
      (product) => product.getSku() === normalizedSku,
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    this.products.splice(productIndex, 1);
  }
}

export const memoryProductRepository = new InMemoryProductRepository();