import express from "express"
import { usercreate, userget, deleteuser, updateUsers, validate } from "../controllers/userController.js"
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js"
const userRoute = express.Router()

//endpoint
userRoute.post("/create", usercreate)
userRoute.get("/get", userget)
userRoute.delete("/delete/:id", deleteuser, verifyTokenMiddleware)
userRoute.put("/update/:id", updateUsers, verifyTokenMiddleware)
userRoute.post("/login",validate)

export default userRoute;

