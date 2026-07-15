import { Product } from "./Product.js";

export class ProductRepository{
    private readonly products: Product[] = [];
    save(product:Product): void {
        this.products.push(product)

    }
    findAll(): Product[]{
        return this.products
    }
}