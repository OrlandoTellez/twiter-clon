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

export const editBioUser = async (req, res) => {
    try {
        const { descripcion } = req.body

        await User.editBioUser(req.userId, descripcion)

        res.json({ message: "Descripcion actualizada", descripcion })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}