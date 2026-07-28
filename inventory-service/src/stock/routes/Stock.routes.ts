import { Router } from "express";
import { AddStockUseCase } from "../usecases/AddStockUseCase.js";
import { FindAllStocksUseCase } from "../usecases/FindAllStocksUseCase.js";
import { FindStockBySkuUseCase } from "../usecases/FindStockBySkuUseCase.js";
import { RemoveStockUseCase } from "../usecases/RemoveStockUseCase.js";
import { InMemoryProductRepository } from "../../product/repositories/InMemoryProductRepository.js";
import { InMemoryStockRepository } from "../repositories/inMemoryStockRepository.js";

const router = Router();
const productRepository = new InMemoryProductRepository();
const stockRepository = new InMemoryStockRepository();
const addStock = new AddStockUseCase(productRepository, stockRepository);
const findAllStock = new FindAllStocksUseCase(stockRepository);
const findStockBySku = new FindStockBySkuUseCase(stockRepository);
const removeStock = new RemoveStockUseCase(productRepository, stockRepository);