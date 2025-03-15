import { editNameUser } from "../controllers/userEditController.js"
import { authenticate } from "../middlewares/authMiddleware.js"
import { Router } from "express"

export const editRouter = Router()

editRouter.patch("/editName", authenticate, editNameUser)
