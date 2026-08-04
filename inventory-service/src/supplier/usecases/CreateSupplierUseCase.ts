import { Supplier } from "../Supplier.js";
import { SupplierRepository } from "../repositories/SupplierRepository.js";

interface CreateSupplierRequest {
  name: string;
  cnpj: string;
}

export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  async execute({ name, cnpj }: CreateSupplierRequest): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findByCnpj(cnpj);
    if (existingSupplier) {
      throw new Error("Supplier with this CNPJ already exists");
    }
    const supplier = new Supplier(name, cnpj);
    await this.supplierRepository.save(supplier);
    return supplier;
  }
}
