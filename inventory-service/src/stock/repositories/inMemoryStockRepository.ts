import { Stock } from "../Stock.js";
import { StockRepository } from "./StockRepository.js";

export class InMemoryStockRepository implements StockRepository {
  private stocks: Stock[] = [];

  save(stock: Stock): void {
    this.stocks.push(stock);
  }

  findBySku(sku: string): Stock | undefined {
    return this.stocks.find((stock) => stock.getProduct().getSku() === sku);
  }

  update(stock: Stock): void {
    const index = this.stocks.findIndex(
      (currentStock) =>
        currentStock.getProduct().getSku() === stock.getProduct().getSku(),
    );
    if (index === -1) {
      throw new Error("Stock not found");
    }
    this.stocks[index] = stock;
  }

  findAll(): Stock[] {
    return [...this.stocks];
  }
}
