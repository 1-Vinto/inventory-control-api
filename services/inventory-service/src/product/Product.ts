export class Product {
  private name: string;
  private description: string;
  private sellPrice: number;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(name: string, description: string, sellPrice: number) {}

  private validateName(name: string): void {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
  }
}
