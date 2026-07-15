import { ProductRepository } from "./ProductRepository.js";
import { CreateProductUseCase } from "./CreateProductUseCase.js";

const repository = new ProductRepository();

const createProduct = new CreateProductUseCase(repository);

const product = createProduct.execute(
  1,
  "Keyboard",
  "Mechanical Keyboard",
  150,
);

console.log(product);

console.log(repository.findAll());
