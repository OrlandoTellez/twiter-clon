import User from "../models/user.js";

export const editNameUser = async (req, res) => {
    try {
        const { nombre } = req.body

        await User.editNameUser(req.userId, nombre)

        res.json({ message: "Nombre actualizado", nombre })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}