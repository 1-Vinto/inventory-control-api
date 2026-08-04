import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { SupplierRepository } from "./SupplierRepository.js";
import { Supplier } from "../Supplier.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export class PrismaSupplierRepository implements SupplierRepository {
    async save(supplier: Supplier): Promise<void>{
        await prisma.supplier.create({
            data: {
                name: supplier.getName(),
                cnpj: supplier.getCnpj(),
            },
        });
    }

    async findAll(): Promise<Supplier[]> {
        const rows = await prisma.supplier.findMany();
        return rows.map((row) =>
            Supplier.restore({
                name: row.name,
                cnpj: row.cnpj,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
            }),
        );
    }

    async findByCnpj(cnpj: string): Promise<Supplier | undefined> {
        const row = await prisma.supplier.findUnique({ where: {cnpj}});
        if (!row) return undefined;
        return Supplier.restore({
            name: row.name,
            cnpj: row.cnpj,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt
        })
    }

    async update(supplier: Supplier): Promise<void> {
        await prisma.supplier.update({
            where: {cnpj: supplier.getCnpj()},
            data: {
                name: supplier.getName(),
                updatedAt: supplier.getUpdatedAt()
            }
        })
    }

    async delete(cnpj: string): Promise<void> {
        await prisma.supplier.delete({where: {cnpj}});
    }

}

export const prismaSupplierRepository = new PrismaSupplierRepository()