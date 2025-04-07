import { Router } from "express"
import { authenticate } from "../middlewares/authMiddleware.js"
import { checkAuth } from "../middlewares/checkAuth.js"
import { createTweet, toggleLike, contarLikes, cargarTweet, cargarAllTweets } from "../controllers/tweetController.js"
import { upload } from "../config/multer.js"

export const tweetRouter = Router()

// Checkear autenticación para todas las rutas de tweets
tweetRouter.use(checkAuth)

tweetRouter.get("/", cargarAllTweets)

tweetRouter.get("/perfil", authenticate, cargarTweet)

tweetRouter.post("/tweets", authenticate, upload.single("imagenTweet"), createTweet)

tweetRouter.post("/likes/:tweet_id", authenticate, toggleLike)

tweetRouter.get("/likes/:tweet_id", contarLikes)
