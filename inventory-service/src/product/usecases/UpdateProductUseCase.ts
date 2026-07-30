import { Product } from "../Product.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

interface UpdateProductRequest {
  targetSku: string;
  data: {
    name: string;
    description: string;
    sellPrice: number;
  };
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute({targetSku, data}: UpdateProductRequest): Promise<Product> {
    const existingProduct = await this.productRepository.findBySku(targetSku);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    existingProduct.changeName(data.name);
    existingProduct.changeDescription(data.description);
    existingProduct.changeSellPrice(data.sellPrice);
    await this.productRepository.update(existingProduct);
    return existingProduct;
  }
}
