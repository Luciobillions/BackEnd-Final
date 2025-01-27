import express from "express"
import { getProducts, createProduct,updateProduct,deleteProduct} from "../controllers/productController.js"
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js"

 const productRoute = express.Router()

//endpoint
productRoute.get("/get", getProducts,verifyTokenMiddleware)
productRoute.post("/create",createProduct,verifyTokenMiddleware)
productRoute.put("/update/:id",updateProduct,verifyTokenMiddleware)
productRoute.delete("/delete/:id",deleteProduct,verifyTokenMiddleware);




export default productRoute;

