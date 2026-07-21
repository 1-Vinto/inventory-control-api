export class Product {
  private name: string;
  private description: string;
  private sellPrice: number;
  private readonly sku: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(name: string, description: string, sellPrice: number, sku: string) {
    this.validateName(name);
    this.validateSku(sku);
    this.validateSellPrice(sellPrice);
    
    const now = new Date();

    this.name = name.trim();
    this.description = description.trim();
    this.sellPrice = sellPrice;
    this.sku = sku.trim();

    this.createdAt = now;
    this.updatedAt = now;
  }
  changeName(name: string): void{
    this.validateName(name);
    this.name = name.trim();
    this.updatedAt = new Date();
  }

  changeDescription(description: string): void{
    this.description = description.trim();
    this.updatedAt = new Date();
  }

  changeSellPrice(sellPrice: number): void{
    this.validateSellPrice(sellPrice);
    this.sellPrice = sellPrice;
    this.updatedAt = new Date();
  }

  private validateName(name: string): void {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
  }

  private validateSellPrice(sellPrice: number): void {
  if (!Number.isFinite(sellPrice) || sellPrice < 0) {
      throw new Error("Sell price must be greater than or equal to zero.");
    }
  }

  private validateSku(sku: string): void {
    if (sku.trim() === "") {
      throw new Error("SKU cannot be empty");
    }
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getSellPrice(): number {
    return this.sellPrice;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getSku(): string {
    return this.sku;
  }
}
