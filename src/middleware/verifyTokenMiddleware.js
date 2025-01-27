import { verifyToken } from "../utils/verifytoken.js";

export const verifyTokenMiddleware= (req, res , next) =>{
    try {
        const aoutHeader = req.headers['authorization'];

        console.log({aoutHeader})
        if (!aoutHeader || !aoutHeader.startsWith("Bearer")){
            return res.status(400).json({message:"❌ No token provided"})
            
        }

        const token= aoutHeader.split(" ")[1]

        const decoded = verifyToken(token)
        console.log({decoded})
        req.user= decoded
        next();
    } catch (error) {
        return res.status(400).json({message:"❌ token not accesses"})
    }
}