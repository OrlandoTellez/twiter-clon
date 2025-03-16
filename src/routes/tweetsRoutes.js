import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet, cargarTweet, cargarAllTweets } from "../controllers/tweetController.js"
import { upload } from "../config/multer.js"

export const tweetRouter = Router()

tweetRouter.get("/", cargarAllTweets)

tweetRouter.post("/tweets", authenticate, upload.single("imagenTweet"), createTweet);