class Supplier {
  private name: string;
  private cnpj: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(name: string, cnpj: string) {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    if (cnpj.trim() === "") {
      throw new Error("CNPJ cannot be empty");
    }

    const now = new Date();

    this.name = name;
    this.cnpj = cnpj;
    this.createdAt = now;
    this.updatedAt = now;
  }
  changeName (name: string): void {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    this.updatedAt = new Date();
  };
  getName(): string {
    return this.name;
  }
  getCnpj(): string {
    return this.cnpj;
  } 
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
