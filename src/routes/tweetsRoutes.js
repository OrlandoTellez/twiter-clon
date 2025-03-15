import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet, cargarAllTweets } from "../controllers/tweetController.js"

export const tweetRouter = Router()

tweetRouter.get("/", cargarAllTweets)

tweetRouter.post("/", authenticate, createTweet)