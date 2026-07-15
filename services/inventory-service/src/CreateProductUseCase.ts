import { Product } from "./Product.js";
import { ProductRepository } from "./ProductRepository.js";

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(
    id: number,
    name: string,
    description: string,
    price: number,
  ): Product {
    const product = new Product(id, name, description, price);
    this.repository.save(product);
    return product;
  }
}
