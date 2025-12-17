import User from "../models/user";
import { Request, Response } from "express";

export const editNameUser = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "No autorizado" })
        const { nombre } = req.body

        await User.editNameUser(req.userId, nombre)

        res.json({ message: "Nombre actualizado", nombre })
    } catch (error) {
        console.error("Error al editar nombre:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export const editBioUser = async (req: Request, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ error: "No autorizado" })
        const { descripcion } = req.body

        await User.editBioUser(req.userId, descripcion)

        res.json({ message: "Descripcion actualizada", descripcion })
    } catch (error) {
        console.error("Error al editar bio:", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}