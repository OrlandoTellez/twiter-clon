import User from "../models/user.js"

export const createTweet = async (req, res) => {
    try {
        const { contenido } = req.body;
        const usuario_id = req.userId; 

        if (!usuario_id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        if (!contenido || typeof contenido !== "string" || contenido.trim() === "") {
            return res.status(400).json({ error: "El contenido del tweet no puede estar vacío" });
        }

        await User.createTweet({ usuario_id, contenido });

        res.status(201).json({ message: "Tweet creado exitosamente" });
    } catch (error) {
        console.error("Error en createTweet:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const cargarTweet = async (req, res) => {
    try {
        const tweets = await User.findUserTweets(req.userId)
        res.json(tweets)
    } catch (error) {
        console.error("Error en cargarTweet:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}


