import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { uploadProfileImage, uploadBannerImage, getProfileImage, getBannerImage } from "../controllers/imageController.js"
import { upload } from "../config/multer.js"

export const imageRouter = Router()

imageRouter.patch("/upload-profile", authenticate, upload.single("imagenPerfil"), uploadProfileImage)
imageRouter.patch("/upload-banner", authenticate, upload.single("imagenBanner"), uploadBannerImage)

imageRouter.get("/upload-profile", authenticate, getProfileImage)
imageRouter.get("/upload-banner", authenticate, getBannerImage)
