import { editNameUser, editBioUser } from "../controllers/userEditController"
import { authenticate } from "../middlewares/authMiddleware"
import { Router } from "express"

export const editRouter = Router()

editRouter.patch("/editName", authenticate, editNameUser)
editRouter.patch("/editBio", authenticate, editBioUser)

