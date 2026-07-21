import { Product } from "../Product.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

export class FindAllProductsUseCase{
    constructor(private readonly productRepository: ProductRepository){}
    execute(): Product[]{
        return this.productRepository.findAll();
    }
}