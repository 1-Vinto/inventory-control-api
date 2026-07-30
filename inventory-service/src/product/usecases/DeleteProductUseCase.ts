import { ProductRepository } from "../repositories/ProductRepository.js";

interface DeleteProductRequest{
    targetSku: string;
}

export class DeleteProductUseCase{
    constructor(private readonly productRepository: ProductRepository){}
    async execute({targetSku}:DeleteProductRequest): Promise<void>{
        const existingProduct = await this.productRepository.findBySku(targetSku);
        if(!existingProduct){
            throw new Error("Product not found");
        }
        await this.productRepository.delete(targetSku);
    }
}