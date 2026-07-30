import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Product } from "../Product.js";
import { ProductRepository } from "./ProductRepository.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export class PrismaProductRepository implements ProductRepository {
  async save(product: Product): Promise<void> {
    await prisma.product.create({
      data: {
        name: product.getName(),
        description: product.getDescription(),
        sellPrice: product.getSellPrice(),
        sku: product.getSku(),
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const rows = await prisma.product.findMany();
    return rows.map((row) =>
      Product.restore({
        name: row.name,
        description: row.description,
        sellPrice: row.sellPrice,
        sku: row.sku,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }),
    );
  }

  async findBySku(sku: string): Promise<Product | undefined> {
    const row = await prisma.product.findUnique({ where: { sku } });
    if (!row) return undefined;
    return Product.restore({
      name: row.name,
      description: row.description,
      sellPrice: row.sellPrice,
      sku: row.sku,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  async update(product: Product): Promise<void> {
    await prisma.product.update({
      where: { sku: product.getSku() },
      data: {
        name: product.getName(),
        description: product.getDescription(),
        sellPrice: product.getSellPrice(),
        updatedAt: product.getUpdatedAt(),
      },
    });
  }

  async delete(sku: string): Promise<void> {
    await prisma.product.delete({ where: { sku } });
  }
}

export const prismaProductRepository = new PrismaProductRepository();
