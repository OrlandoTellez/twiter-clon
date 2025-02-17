import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const authenticate = (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            error: "Acceso no autorizado"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error("Error de verificación:", error.message)
        return res.status(401).json({ error: "Token inválido o expirado" })
    }
}