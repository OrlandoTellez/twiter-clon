import jwt from "jsonwebtoken"
import { Request } from "express"
import dotenv from "dotenv"
dotenv.config()

export const checkAuth = (req: Request, res: any, next: any) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1])

  if (token && process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number }
      req.userId = decoded.userId
    } catch (error) {
      console.error("Token inválido:", error)
    }
  }

  next()
}