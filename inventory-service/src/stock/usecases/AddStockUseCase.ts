import { ProductRepository } from "../../product/repositories/ProductRepository.js";
import { StockRepository } from "../repositories/StockRepository.js";
import { Stock } from "../Stock.js";

interface AddStockRequest {
  sku: string;
  quantity: number;
  unitCost: number;
}

export class AddStockUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockRepository: StockRepository,
  ) {}

  execute(request: AddStockRequest): void{
    const product = this.productRepository.findBySku(request.sku);
    const stock = this.stockRepository.findBySku(request.sku);

    if (!product){
        throw new Error("Product not Found")
    }
    if (!stock){
        const newStock = new Stock(product);
        newStock.addStock(request.quantity, request.unitCost)
        this.stockRepository.save(newStock)
        return; 
    }
    stock.addStock(request.quantity, request.unitCost);
    this.stockRepository.update(stock)
  }
}
