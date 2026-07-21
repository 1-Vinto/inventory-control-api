import { SupplierRepository } from "../repositories/SupplierRepository.js";

interface DeleteSupplierRequest{
    targetCnpj: string;
}
export class DeleteSupplierUseCase{
    constructor(private readonly supplierRepository: SupplierRepository){}
    execute({targetCnpj}: DeleteSupplierRequest): void {
        const existingSupplier = this.supplierRepository.findByCnpj(targetCnpj);
        if(!existingSupplier){
            throw new Error("Supplier not found");
        }
        this.supplierRepository.delete(targetCnpj);
    }
}