import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet, cargarTweet } from "../controllers/tweetController.js"

export const tweetRouter = Router()

tweetRouter.get("/tweets", authenticate, cargarTweet)

tweetRouter.post("/tweets", authenticate, createTweet)