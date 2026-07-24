import { Stock } from "../Stock.js";

export interface StockRepository{
    save(stock: Stock): void;
    update(stock: Stock): void;
    findAll(): Stock[];
    findBySku(sku: string): Stock | undefined;
}