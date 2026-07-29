import { Router } from "express";
import { memorySupplierRepository } from "../repositories/InMemorySupplierRepository.js";
import { CreateSupplierUseCase } from "../usecases/CreateSupplierUseCase.js";
import { DeleteSupplierUseCase } from "../usecases/DeleteSupplierUseCase.js";
import { FindAllSuppliersUseCase } from "../usecases/FindAllSuppliersUseCase.js";
import { UpdateSupplierUseCase } from "../usecases/UpdateSupplierUseCase.js";

const router = Router();
const supplierRepository = memorySupplierRepository;
const createSupplier = new CreateSupplierUseCase(supplierRepository);
const deleteSupplier = new DeleteSupplierUseCase(supplierRepository);
const updateSupplier = new UpdateSupplierUseCase(supplierRepository);
const findAllSuppliers = new FindAllSuppliersUseCase(supplierRepository);

router.post("/suppliers", (request, response) => {
  try {
    const supplier = createSupplier.execute(request.body);
    response.status(201).json(supplier);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.delete("/suppliers/:cnpj", (request, response) => {
  try {
    const cnpj = request.params.cnpj;
    deleteSupplier.execute({ targetCnpj: cnpj });
    response.status(204).send();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.put("/suppliers/:cnpj", (request, response) => {
  try {
    const cnpj = request.params.cnpj;
    const name = request.body.name;
    const editSupplier = updateSupplier.execute({ targetCnpj: cnpj, name });
    response.status(200).json(editSupplier);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.get("/suppliers", (request, response) => {
    const allSuppliers = findAllSuppliers.execute();
    response.status(200).json(allSuppliers);
});

export  { router as supplierRoutes };