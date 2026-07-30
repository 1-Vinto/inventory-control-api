import { Product } from "../Product.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

interface CreateProductRequest {
  name: string;
  description: string;
  sellPrice: number;
  sku: string;
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ name, description, sellPrice, sku }: CreateProductRequest): Promise<Product> {
    const normalizedSku = sku.trim();
    const existingProduct = await this.productRepository.findBySku(normalizedSku);
    if (existingProduct) {
      throw new Error("Product with this SKU already exists");
    }

    const product = new Product(name, description, sellPrice, sku);
    await this.productRepository.save(product);
    return product;
  }
}
