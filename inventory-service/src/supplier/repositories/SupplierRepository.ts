import { Supplier } from "../Supplier.js";

export interface SupplierRepository{
    save(supplier: Supplier): Promise<void>;
    findAll(): Promise<Supplier[]>;
    findByCnpj(cnpj: string): Promise<Supplier| undefined>; 
    update(supplier: Supplier): Promise<void>;
    delete(cnpj: string): Promise<void>;
}  