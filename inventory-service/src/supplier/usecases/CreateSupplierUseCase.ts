import { Supplier } from "../Supplier.js";
import { SupplierRepository } from "../repositories/SupplierRepository.js";

interface CreateSupplierRequest {
  name: string;
  cnpj: string;
}

export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  execute({ name, cnpj }: CreateSupplierRequest) {
    const existingSupplier = this.supplierRepository.findByCnpj(cnpj);
    if (existingSupplier) {
      throw new Error("Supplier with this CNPJ already exists");
    }
    const supplier = new Supplier(name, cnpj);
    this.supplierRepository.save(supplier);
    return supplier;
  }
}
