import { Router } from "express";
//import { memoryProductRepository } from "../repositories/InMemoryProductRepository.js";
import { CreateProductUseCase } from "../usecases/CreateProductUseCase.js";
import { FindAllProductsUseCase } from "../usecases/FindAllProductsUseCase.js";
import { UpdateProductUseCase } from "../usecases/UpdateProductUseCase.js";
import { DeleteProductUseCase } from "../usecases/DeleteProductUseCase.js";
import { prismaProductRepository } from "../repositories/PrismaProductRepository.js";

const router = Router();
const repository = prismaProductRepository;
const createProduct = new CreateProductUseCase(repository);
const findAllProducts = new FindAllProductsUseCase(repository);
const updateProduct = new UpdateProductUseCase(repository);
const deleteProduct = new DeleteProductUseCase(repository);

router.post("/products", async (request, response) => {
  try {
    const product = await createProduct.execute(request.body);

    response.status(201).json(product);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    response.status(400).json({ message });
  }
});

router.get("/products", async (request, response) => {
  const allProducts = await findAllProducts.execute();
  response.status(200).json(allProducts);
});

router.put("/products/:sku", async (request, response) => {
  try {
    const sku = request.params.sku;
    const data = request.body;
    const editProduct = await updateProduct.execute({ targetSku: sku, data: data });

    response.status(200).json(editProduct);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.delete("/products/:sku", async (request, response) => {
  try {
    const sku = request.params.sku;
    await deleteProduct.execute({ targetSku: sku });

    response.status(204).send();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

export { router as productRoutes };
