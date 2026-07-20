import { ProductRepository } from "./product/repositories/ProductRepository.js";
import { CreateProductUseCase } from "./product/usecases/CreateProductUseCase.js";

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
