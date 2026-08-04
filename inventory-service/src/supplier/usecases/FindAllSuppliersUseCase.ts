import { SupplierRepository } from "../repositories/SupplierRepository.js";
import { Supplier } from "../Supplier.js";

export class FindAllSuppliersUseCase {
  constructor(private readonly supplierRepository: SupplierRepository) {}
  async execute(): Promise<Supplier[]> {
    return await this.supplierRepository.findAll();
  }
}
