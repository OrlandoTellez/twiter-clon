import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const checkAuth = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1])

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId
    } catch (error) {
      console.error("Token inválido:", error)
    }
  }

  next()
}