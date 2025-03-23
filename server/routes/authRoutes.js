import { Router } from "express"
import { authController } from "../controllers/authControllers.js"


const authRoutes = Router()
authRoutes.post('/signin',authController)

export default authRoutes