import { Product } from "../product/Product.js";

export class Stock {
  private readonly product: Product;
  private quantity: number;
  private averageCost: number;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(product: Product) {
    const now = new Date();

    this.product = product;
    this.quantity = 0;
    this.averageCost = 0;
    this.createdAt = now;
    this.updatedAt = now;
  }

  addStock(quantity: number, unitCost: number): void {
    this.validateQuantity(quantity);
    this.validateUnitCost(unitCost);

    const currentStockValue = this.getCurrentStockValue();
    const newEntryValue = this.getNewEntryValue(quantity, unitCost);
    const newAverageCost = this.calculateAverageCost(
      currentStockValue,
      newEntryValue,
      quantity,
    );
    const newQuantity = this.quantity + quantity;

    this.averageCost = newAverageCost;
    this.quantity = newQuantity;
    this.updatedAt = new Date();
  }

  removeStock(quantity: number): void {
    this.validateQuantity(quantity);
    this.validateAvailableStock(quantity);

    const newQuantity = this.quantity - quantity;

    this.quantity = newQuantity;
    this.updatedAt = new Date();
  }

  private validateQuantity(quantity: number): void {
    if (!Number.isFinite(quantity) || quantity <= 0)
      throw new Error("Quantity must be greater than 0");
  }

  private validateUnitCost(unitCost: number): void {
    if (!Number.isFinite(unitCost) || unitCost <= 0)
      throw new Error("Unit Cost must be greater than 0");
  }

  private getCurrentStockValue(): number {
    const currentStockValue = this.quantity * this.averageCost;
    return currentStockValue;
  }

  private getNewEntryValue(quantity: number, unitCost: number): number {
    const newEntryValue = quantity * unitCost;
    return newEntryValue;
  }

  private calculateAverageCost(
    currentStockValue: number,
    newEntryValue: number,
    entryQuantity: number,
  ): number {
    const newStockValue = currentStockValue + newEntryValue;
    const newQuantity = entryQuantity + this.quantity;
    const newAverageCost = newStockValue / newQuantity;
    return newAverageCost;
  }

  private validateAvailableStock(quantity: number): void {
    if (quantity > this.quantity) {
      throw new Error("Quantity exceeds available stock");
    }
  }

  getProduct(): Product {
    return this.product;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getAverageCost(): number {
    return this.averageCost;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
