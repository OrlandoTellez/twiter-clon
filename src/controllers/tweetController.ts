import Tweet from "../models/tweet"
import db from "../db/db"
import { Request, Response } from "express"

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const createTweet = async (req: Request, res: Response) => {
    try {
        const { contenido } = req.body
        const usuario_id = req.userId
        const imagenTweetUrl = req.file ? req.file.path : null

        if (!usuario_id) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        if (!contenido || typeof contenido !== "string" || contenido.trim() === "") {
            return res.status(400).json({ error: "El contenido del tweet no puede estar vacío" })
        }


        const tweetId = await Tweet.createTweet({ usuario_id, contenido });

        if (imagenTweetUrl) {
            await Tweet.updateTweetImage(tweetId, imagenTweetUrl)
        }

        res.status(201).json({ message: "Tweet creado exitosamente", tweetId, imagenTweetUrl })
    } catch (error) {
        console.error("Error en createTweet:", error);
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const cargarTweet = async (req: Request, res: Response) => {
    try {
    const usuario_id = req.userId || null;

    const tweets = await Tweet.findUserTweets(usuario_id)

    res.render("perfil", { tweets, authenticated: !!req.userId })

    } catch (error) {
      console.error("Error en cargarTweet:", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  }


  export const cargarAllTweets = async (req: Request, res: Response) => {
    try {
        const usuario_id = req.userId || null

        const tweets = await Tweet.findAllTweets(usuario_id)

        res.render("index", { tweets, authenticated: !!usuario_id })

    } catch (error) {
        console.error("Error en cargarAllTweets:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const toggleLike = async (req: Request, res: Response) => {
  try {
      const usuario_id = req.userId
      const { tweet_id } = req.params
      const parsedTweetId = parseInt(tweet_id, 10)

      if (!usuario_id) {
          return res.status(401).json({ message: "Usuario no autenticado" })
      }

      if (isNaN(parsedTweetId)) {
          return res.status(400).json({ message: "ID de tweet inválido" })
      }

      const { liked } = await Tweet.toggleLike(usuario_id, parsedTweetId)
      const totalLikes = await Tweet.contarLikes(parsedTweetId)

      return res.status(200).json({ liked, totalLikes })
  } catch (error) {
      console.error("Error al dar like:", error)
      return res.status(500).json({ message: "Error interno del servidor" })
  }
}

export const contarLikes = async (req: Request, res: Response) => {
  try {
      const { tweet_id } = req.params
      const parsedTweetId = parseInt(tweet_id, 10)

      if (isNaN(parsedTweetId)) {
          return res.status(400).json({ message: "ID de tweet inválido" })
      }

      const totalLikes = await Tweet.contarLikes(parsedTweetId)
      res.json({ totalLikes })
  } catch (error) {
      console.error("Error en contarLikes:", error)
      res.status(500).json({ error: "Error interno del servidor" })
  }
}

