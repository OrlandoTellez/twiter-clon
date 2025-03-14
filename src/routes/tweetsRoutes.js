import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet, cargarTweet, cargarAllTweets } from "../controllers/tweetController.js"

export const tweetRouter = Router()

tweetRouter.get("/tweets", authenticate, cargarTweet)
tweetRouter.get("/", cargarAllTweets)

tweetRouter.post("/tweets", authenticate, createTweet)