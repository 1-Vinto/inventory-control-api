import { ProductRepository } from "../repositories/ProductRepository.js";

interface DeleteProductRequest{
    targetSku: string;
}

export class DeleteProductUseCase{
    constructor(private readonly productRepository: ProductRepository){}
    execute({targetSku}:DeleteProductRequest): void{
        const existingProduct = this.productRepository.findBySku(targetSku);
        if(!existingProduct){
            throw new Error("Product not found");
        }
        this.productRepository.delete(targetSku);
    }
}