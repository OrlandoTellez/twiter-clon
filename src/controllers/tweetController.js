import Tweet from "../models/tweet.js"

export const createTweet = async (req, res) => {
    try {
        const { contenido } = req.body;
        const usuario_id = req.userId;
        const imagenTweetUrl = req.file ? req.file.path : null; // Obtener la imagen si se subió

        if (!usuario_id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        if (!contenido || typeof contenido !== "string" || contenido.trim() === "") {
            return res.status(400).json({ error: "El contenido del tweet no puede estar vacío" });
        }

        // Insertar el tweet y obtener su ID
        const tweetId = await Tweet.createTweet({ usuario_id, contenido });

        // Si hay una imagen, actualizar el tweet con la URL de la imagen
        if (imagenTweetUrl) {
            await Tweet.updateTweetImage(tweetId, imagenTweetUrl);
        }

        res.status(201).json({ message: "Tweet creado exitosamente", tweetId, imagenTweetUrl });
    } catch (error) {
        console.error("Error en createTweet:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const cargarTweet = async (req, res) => {
    try {
        const tweets = await Tweet.findUserTweets(req.userId)
        res.render("perfil", { tweets })

    } catch (error) {
        console.error("Error en cargarTweet:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const cargarAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.findAllTweets()
        res.render("index", { tweets })
    } catch (error) {
        console.error("Error en cargarAllTweets:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}


