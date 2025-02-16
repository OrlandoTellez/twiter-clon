import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization")

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Formato de token inválido" });
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error("Error de verificación:", error.message)
        return res.status(401).json({ error: "Token inválido o expirado" })
    }
}