import { ProductRepository } from "../../product/repositories/ProductRepository.js";
import { StockRepository } from "../repositories/StockRepository.js";

interface RemoveStockRequest{
    sku: string;
    quantity: number;
}

export class RemoveStockUseCase{
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly stockRepository: StockRepository
    ){}
    execute(request: RemoveStockRequest): void{
        const product = this.productRepository.findBySku(request.sku);
        const stock = this.stockRepository.findBySku(request.sku);

        if(!product){
            throw new Error("Product not found")
        }
        if(!stock){
            throw new Error("Stock not found")
        }
        stock.removeStock(request.quantity);
        this.stockRepository.update(stock)
    }
}