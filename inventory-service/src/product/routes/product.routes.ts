import { Router } from "express";
import { memoryProductRepository } from "../repositories/InMemoryProductRepository.js";
import { CreateProductUseCase } from "../usecases/CreateProductUseCase.js";
import { FindAllProductsUseCase } from "../usecases/FindAllProductsUseCase.js";
import { UpdateProductUseCase } from "../usecases/UpdateProductUseCase.js";
import { DeleteProductUseCase } from "../usecases/DeleteProductUseCase.js";

const router = Router();
const repository = memoryProductRepository;
const createProduct = new CreateProductUseCase(repository);
const findAllProducts = new FindAllProductsUseCase(repository);
const updateProduct = new UpdateProductUseCase(repository);
const deleteProduct = new DeleteProductUseCase(repository);

router.post("/products", (request, response) => {
  try {
    const product = createProduct.execute(request.body);

    response.status(201).json(product);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    response.status(400).json({ message });
  }
});

router.get("/products", (request, response) => {
  const allProducts = findAllProducts.execute();
  response.status(200).json(allProducts);
});

router.put("/products/:sku", (request, response) => {
  try {
    const sku = request.params.sku;
    const data = request.body;
    const editProduct = updateProduct.execute({ targetSku: sku, data: data });

    response.status(200).json(editProduct);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    response.status(400).json({ message });
  }
});

router.delete("/products/:sku", (request, response) => {
  try {
    const sku = request.params.sku;
    deleteProduct.execute({ targetSku: sku });

    response.status(204).send();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    response.status(400).json({ message });
  }
});

export { router as productRoutes };
