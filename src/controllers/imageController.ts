import Images from "../models/images";
import User from "../models/user";
import { Request, Response } from "express";

export const uploadProfileImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) { 
            return res.status(400).json({ error: "No se ha subido ninguna imagen de perfil" })
        }

        const imagenPerfilUrl = req.file.path

        await Images.updateProfileImage(req.userId!, imagenPerfilUrl)

        res.json({ message: "Imagen de perfil actualizada", imagenPerfilUrl })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const uploadBannerImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ninguna imagen de fondo" })
        }

        const imagenFondoUrl = req.file.path
        await Images.updateBannerImage(req.userId!, imagenFondoUrl)

        res.json({ message: "Imagen de fondo actualizada", imagenFondoUrl })
    } catch (error) {
        console.error("Error al subir imagen:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};
export const getProfileImage = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "No autorizado" })
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" })

        res.json({ imagenPerfilUrl: user.imagen_perfil })
    } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};

export const getBannerImage = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "No autorizado" })
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" })

        res.json({ imagenFondoUrl: user.imagen_banner })
    } catch (error) {
        console.error("Error al obtener la imagen de fondo:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
};
