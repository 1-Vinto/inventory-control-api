import { SupplierRepository } from "../repositories/SupplierRepository.js";
import { Supplier } from "../Supplier.js";

interface UpdateSupplierRequest {
  targetCnpj: string;
  name: string;
}

export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  execute({ targetCnpj, name }: UpdateSupplierRequest): Supplier {
    const existingSupplier = this.supplierRepository.findByCnpj(targetCnpj);
    if (!existingSupplier) {
      throw new Error("Supplier not found");
    }
    existingSupplier.changeName(name);
    this.supplierRepository.update(existingSupplier);
    return existingSupplier;
  }
}
