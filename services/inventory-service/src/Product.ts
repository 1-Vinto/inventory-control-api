export class Product{
    public readonly id: number;
    public readonly name: string;
    public readonly description: string;
    public readonly price: number; 

    constructor(
        id: number,
        name: string,
        description: string,
        price: number
    ){
        if (!name.trim()) {
            throw new Error("product name is required")
        }
        if (price <= 0){
            throw new Error("Product price must be greater than zero")
        }
        this.id = id
        this.name = name
        this.description = description
        this.price = price
    }
}