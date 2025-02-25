import User from "../models/user.js";

export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ninguna imagen" });
        }

        const imagenUrl = req.file.path; 
        console.log("URL de la imagen subida:", imagenUrl);

        await User.updateProfileImage(req.userId, imagenUrl);

        res.json({ message: "Imagen de perfil actualizada", imagenUrl });
    } catch (error) {
        console.error("Error al subir imagen:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};