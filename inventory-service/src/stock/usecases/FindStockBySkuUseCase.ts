import { StockRepository } from "../repositories/StockRepository.js";
import { Stock } from "../Stock.js";

interface FindStockRequest {
  sku: string;
}

export class FindStockBySkuUseCase {
  constructor(private readonly stockRepository: StockRepository) {}
  execute(request: FindStockRequest): Stock{
    const stock = this.stockRepository.findBySku(request.sku)
    if(!stock){
        throw new Error("Stock not found")
    }
    return stock;
  }
}
