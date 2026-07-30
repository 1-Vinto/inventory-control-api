import "dotenv/config"
import express from "express"
import { productRoutes } from "./product/routes/product.routes.js";
import { stockRoutes } from "./stock/routes/Stock.routes.js";
import { supplierRoutes } from "./supplier/routes/Supplier.routes.js";

const app  = express();
app.use(express.json());

app.use(productRoutes);
app.use(stockRoutes);
app.use(supplierRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));