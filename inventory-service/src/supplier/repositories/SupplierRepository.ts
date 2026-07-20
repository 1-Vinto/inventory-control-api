import { Supplier } from "../Supplier.js";

export interface SupplierRepository{
    save(supplier: Supplier): void;
    findAll(): Supplier[];
    findByCnpj(cnpj: string): Supplier| undefined; 
    update(supplier: Supplier): void;
    delete(cnpj: string): void;
}  