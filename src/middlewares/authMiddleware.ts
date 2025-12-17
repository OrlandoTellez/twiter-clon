import jwt from "jsonwebtoken"
import { Request } from "express"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticate = (req: Request, res: any, next: any) => {
    const token = req.cookies.token

    if (!token) {
        if (req.accepts("html")) {
            return res.redirect("/auth/login")
        } else {
            return res.status(401).json({ error: "Acceso no autorizado" })
        }
    }

    if (!JWT_SECRET) {
        console.error("JWT_SECRET no está definido")
        return res.status(500).json({ error: "Error interno del servidor" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error("Error de verificación:", error instanceof Error ? error.message : error)
        return res.status(401).json({ error: "Token inválido o expirado" })
    }
}
