import express from "express"
import { productRoutes } from "./product/routes/product.routes.js";

const app  = express();
app.use(express.json());

app.use(productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));