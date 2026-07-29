import { Router } from "express";
import { AddStockUseCase } from "../usecases/AddStockUseCase.js";
import { FindAllStocksUseCase } from "../usecases/FindAllStocksUseCase.js";
import { FindStockBySkuUseCase } from "../usecases/FindStockBySkuUseCase.js";
import { RemoveStockUseCase } from "../usecases/RemoveStockUseCase.js";
import { memoryProductRepository } from "../../product/repositories/InMemoryProductRepository.js";
import { memoryStockRepository } from "../repositories/inMemoryStockRepository.js";

const router = Router();
const productRepository = memoryProductRepository;
const stockRepository = memoryStockRepository;
const addStock = new AddStockUseCase(productRepository, stockRepository);
const findAllStocks = new FindAllStocksUseCase(stockRepository);
const findStockBySku = new FindStockBySkuUseCase(stockRepository);
const removeStock = new RemoveStockUseCase(productRepository, stockRepository);

router.post("/stocks", (request, response) => {
  try {
    addStock.execute(request.body);

    const sku  = request.body.sku;
    const updatedStock = findStockBySku.execute({sku});

    response.status(201).json(updatedStock)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.get("/stocks", (request, response) => {
  const allStocks = findAllStocks.execute();
  response.status(200).json(allStocks);
});

router.get("/stocks/:sku", (request, response) => {
  try {
    const sku = request.params.sku;
    const findBySku = findStockBySku.execute({ sku: sku });
    response.status(200).json(findBySku);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.patch("/stocks/:sku", (request, response) => {
  try {
    const sku = request.params.sku;
    const quantity = request.body.quantity;
    removeStock.execute({ sku, quantity });
    response.status(200).json({ message: "Quantity removed" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

export {router as stockRoutes}