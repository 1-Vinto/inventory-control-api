import { SupplierRepository } from "../repositories/SupplierRepository.js";
import { Supplier } from "../Supplier.js";

interface UpdateSupplierRequest {
  targetCnpj: string;
  name: string;
}

export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  async execute({ targetCnpj, name }: UpdateSupplierRequest): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findByCnpj(targetCnpj);
    if (!existingSupplier) {
      throw new Error("Supplier not found");
    }
    existingSupplier.changeName(name);
    await this.supplierRepository.update(existingSupplier);
    return existingSupplier;
  }
}
