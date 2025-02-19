import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    try{
        const {nombre_usuario, nombre, apellido, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({nombre_usuario, nombre, apellido, email, password: hashedPassword})

        res.status(201).json({message: "usuario registrado exitosamente"})
    }catch (error) {
        console.error("Error en registro:", error)
        res.status(500).json({
            error: "Error al registrar usuario",
            details: error.message 
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByEmail(email)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 600000 // 10 minutos
        })

        res.json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const perfil = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        const { password, ...safeUserData } = user
        res.json(safeUserData)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Sesion cerrada exitosamente"
    })
}

export const checkSesion = async (req, res) => {
    try{
        const token = req.cookies.token

        if(!token){
            return res.json({ isAuth: false })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if(!user){
            return res.json({ isAuth: false })
        }

        

        res.json({
            isAuth: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    }catch (error) {
        res.status(500).json({ error: error.message, isAuth: false })
    }
}