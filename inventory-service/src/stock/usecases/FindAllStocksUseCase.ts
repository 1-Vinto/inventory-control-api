import { StockRepository } from "../repositories/StockRepository.js";
import { Stock } from "../Stock.js";

export class FindAllStocksUseCase{
    constructor(private readonly stockRepository: StockRepository){}
    execute(): Stock[]{
        return this.stockRepository.findAll();
    }
}