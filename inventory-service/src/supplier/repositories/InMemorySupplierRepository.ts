import { Supplier } from "../Supplier.js";
import { SupplierRepository } from "./SupplierRepository.js";

export class InMemorySupplierRepository implements SupplierRepository {
  private suppliers: Supplier[] = [];

  save(supplier: Supplier): void {
    this.suppliers.push(supplier);
  }

  findAll(): Supplier[] {
    return [...this.suppliers];
  }

  findByCnpj(cnpj: string): Supplier | undefined {
    const normalizedCnpj = cnpj.trim();
    return this.suppliers.find((supplier) => supplier.getCnpj() === normalizedCnpj);
  }
  update(supplier: Supplier): void {
    const supplierIndex = this.suppliers.findIndex(
      (currentSupplier) => currentSupplier.getCnpj() === supplier.getCnpj(),
    );
    if (supplierIndex === -1) {
      throw new Error("Supplier not found");
    }
    this.suppliers[supplierIndex] = supplier;
  }
  delete(cnpj: string): void {
    const normalizedCnpj = cnpj.trim();
    const supplierIndex = this.suppliers.findIndex(
      (supplier) => supplier.getCnpj() === normalizedCnpj,
    );
    if (supplierIndex === -1) {
      throw new Error("Supplier not found");
    }
    this.suppliers.splice(supplierIndex, 1);
  }
}
