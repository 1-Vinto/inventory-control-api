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
  execute({targetSku, data}: UpdateProductRequest): Product {
    const existingProduct = this.productRepository.findBySku(targetSku);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    existingProduct.changeName(data.name);
    existingProduct.changeDescription(data.description);
    existingProduct.changeSellPrice(data.sellPrice);
    this.productRepository.update(existingProduct);
    return existingProduct;
  }
}
