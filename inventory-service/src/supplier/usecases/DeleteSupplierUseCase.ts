import { SupplierRepository } from "../repositories/SupplierRepository.js";

interface DeleteSupplierRequest{
    cnpj: string;
}
export class DeleteSupplierUseCase{
    constructor(private readonly supplierRepository: SupplierRepository){}
    execute({cnpj}: DeleteSupplierRequest): void {
        const existingSupplier = this.supplierRepository.findByCnpj(cnpj);
        if(!existingSupplier){
            throw new Error("Supplier not found")
        }
        this.supplierRepository.delete(cnpj);
    }
}