import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet } from "../controllers/tweetController.js"

export const tweetRouter = Router()

tweetRouter.post("/tweets",authenticate, createTweet)