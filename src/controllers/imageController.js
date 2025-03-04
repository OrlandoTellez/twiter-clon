import Images from "../models/images.js";
import User from "../models/user.js";

export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) { 
            return res.status(400).json({ error: "No se ha subido ninguna imagen de perfil" })
        }

        const imagenPerfilUrl = req.file.path
        const { nombre, bio } = req.body

        await Images.updateProfileImage(req.userId, imagenPerfilUrl, nombre, bio)

        res.json({ message: "Imagen de perfil actualizada", imagenPerfilUrl })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const uploadBannerImage = async (req, res) => {
    try {
        if (!req.file) {  
            return res.status(400).json({ error: "No se ha subido ninguna imagen de fondo" })
        }

        const imagenFondoUrl = req.file.path 
        await Images.updateBannerImage(req.userId, imagenFondoUrl)

        res.json({ message: "Imagen de fondo actualizada", imagenFondoUrl })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};
export const getProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" })

        res.json({ imagenPerfilUrl: user.imagen_perfil })
    } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};

export const getBannerImage = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" })

        res.json({ imagenFondoUrl: user.imagen_banner })
    } catch (error) {
        console.error("Error al obtener la imagen de fondo:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};
