import User from "../models/user.js"

export const createTweet = async (req, res) => {
    const { contenido } = req.body
    const usuario_id = req.userId

    await User.createTweet({ usuario_id, contenido })

    res.status(201).json({ message: "Tweet creado exitosamente" })
}

