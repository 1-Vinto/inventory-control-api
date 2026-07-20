import { SupplierRepository } from "../repositories/SupplierRepository.js";
import { Supplier } from "../Supplier.js";

export class FindAllSuppliersUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  execute(): Supplier[] {
    return this.supplierRepository.findAll();
  }
}
