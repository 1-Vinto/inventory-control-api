import { SupplierRepository } from "../repositories/SupplierRepository.js";

interface DeleteSupplierRequest{
    targetCnpj: string;
}
export class DeleteSupplierUseCase{
    constructor(private readonly supplierRepository: SupplierRepository){}
    async execute({targetCnpj}: DeleteSupplierRequest): Promise<void> {
        const existingSupplier = this.supplierRepository.findByCnpj(targetCnpj);
        if(!existingSupplier){
            throw new Error("Supplier not found");
        }
        await this.supplierRepository.delete(targetCnpj);
    }
}