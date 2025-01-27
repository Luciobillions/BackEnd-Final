import express from "express";
import {getcategory,deletecategorys,updatecategorys,createcategory} from "../controllers/categoryController.js"
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const categoryRoute= express.Router()

categoryRoute.get("/get",verifyTokenMiddleware,getcategory)
categoryRoute.post("/create",verifyTokenMiddleware,createcategory)
categoryRoute.delete("/delete/:id",verifyTokenMiddleware,deletecategorys)
categoryRoute.put("/update/:id",verifyTokenMiddleware,updatecategorys)

export default categoryRoute;
