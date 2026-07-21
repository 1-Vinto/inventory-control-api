import { Product } from "../Product.js";
import { ProductRepository } from "./ProductRepository.js";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  save(product: Product): void {
    this.products.push(product);
  }

  findAll(): Product[] {
    return [...this.products];
  }

  findBySku(sku: string): Product | undefined {
    const normalizedSku = sku.trim();
    return this.products.find((product) => product.getSku() === normalizedSku);
  }

  update(product: Product): void {
    const productIndex = this.products.findIndex(
      (currentProduct) => currentProduct.getSku() === product.getSku(),
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    this.products[productIndex] = product;
  }

  delete(sku: string): void {
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
