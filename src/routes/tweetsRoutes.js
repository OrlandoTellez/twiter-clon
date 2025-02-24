import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { createTweet } from "../controllers/tweetController.js"

const router = Router()

router.post("/tweets", authenticate, createTweet)

export default router