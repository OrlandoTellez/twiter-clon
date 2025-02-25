import { Router } from "express"
import {authenticate} from "../middlewares/authMiddleware.js"
import { uploadProfileImage } from "../controllers/imageController.js"
import { upload } from "../config/multer.js"

export const imageRouter = Router()

imageRouter.post("/upload-image", authenticate, upload.single("imagen"), uploadProfileImage)
