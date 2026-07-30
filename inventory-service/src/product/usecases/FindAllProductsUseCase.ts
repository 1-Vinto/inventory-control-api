import { Product } from "../Product.js";
import { ProductRepository } from "../repositories/ProductRepository.js";

export class FindAllProductsUseCase{
    constructor(private readonly productRepository: ProductRepository){}
    async execute(): Promise<Product[]>{
        return await this.productRepository.findAll();
    }
}