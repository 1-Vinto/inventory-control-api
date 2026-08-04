export class Supplier {
  private name: string;
  private cnpj: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(name: string, cnpj: string) {
    this.validateName(name);

    const normalizedCnpj = cnpj.trim().replace(/\D/g, "");
    this.validateCnpj(normalizedCnpj);

    const now = new Date();

    this.name = name.trim();
    this.cnpj = normalizedCnpj;
    this.createdAt = now;
    this.updatedAt = now;
  }

  static restore(data:{
    name: string;
    cnpj: string;
    createdAt: Date;
    updatedAt: Date;
  }): Supplier {
    const supplier = Object.create(Supplier.prototype) as Supplier;
    supplier.name = data.name;
    supplier.cnpj = data.cnpj;
    (supplier as any).createdAt = data.createdAt;
    supplier.updatedAt = data.updatedAt;
    return supplier;
  }

  changeName(name: string): void {
    this.validateName(name);
    this.name = name.trim();
    this.updatedAt = new Date();
  }

  private validateName(name: string): void {
    if (name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
  }

  private validateCnpj(cnpj: string): void {
    if (cnpj === "") {
      throw new Error("CNPJ cannot be empty");
    }
    if (!/^\d{14}$/.test(cnpj)) {
      throw new Error("CNPJ must be a 14-digit number");
    }
  }

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
