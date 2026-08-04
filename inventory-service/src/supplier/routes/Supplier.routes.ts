import { Router } from "express";
//import { memorySupplierRepository } from "../repositories/InMemorySupplierRepository.js";
import { CreateSupplierUseCase } from "../usecases/CreateSupplierUseCase.js";
import { DeleteSupplierUseCase } from "../usecases/DeleteSupplierUseCase.js";
import { FindAllSuppliersUseCase } from "../usecases/FindAllSuppliersUseCase.js";
import { UpdateSupplierUseCase } from "../usecases/UpdateSupplierUseCase.js";
import { prismaSupplierRepository } from "../repositories/PrismaSupplierRepository.js";

const router = Router();
const repository = prismaSupplierRepository;
const createSupplier = new CreateSupplierUseCase(repository);
const deleteSupplier = new DeleteSupplierUseCase(repository);
const updateSupplier = new UpdateSupplierUseCase(repository);
const findAllSuppliers = new FindAllSuppliersUseCase(repository);

router.post("/suppliers", async (request, response) => {
  try {
    const supplier = await createSupplier.execute(request.body);
    response.status(201).json(supplier);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.delete("/suppliers/:cnpj", async (request, response) => {
  try {
    const cnpj = request.params.cnpj;
    await deleteSupplier.execute({ targetCnpj: cnpj });
    response.status(204).send();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.put("/suppliers/:cnpj", async (request, response) => {
  try {
    const cnpj = request.params.cnpj;
    const name = request.body.name;
    const editSupplier = await updateSupplier.execute({ targetCnpj: cnpj, name });
    response.status(200).json(editSupplier);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    response.status(400).json({ message });
  }
});

router.get("/suppliers", async (request, response) => {
    const allSuppliers = await findAllSuppliers.execute();
    response.status(200).json(allSuppliers);
});

export  { router as supplierRoutes };