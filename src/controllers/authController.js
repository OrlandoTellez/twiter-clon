import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Tweet from "../models/tweet.js"
import dotenv from "dotenv"
import { validateUserRegister, validateUserLogin } from "../validations/userValidation.js"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const getRegister = (req, res) => res.render("auth/registro")
export const getLogin = (req, res) => res.render("auth/login")

export const register = async (req, res) => {
    try {
        const user = validateUserRegister(req.body);

        if (!user.success) {
            return res.status(400).json({ error: "Datos inválidos", details: user.error.errors });
        }

        const { nombre_usuario, nombre, apellido, email, password } = user.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ nombre_usuario, nombre, apellido, email, password: hashedPassword });

        const savedUser = await User.findByEmail(email)

        const token = jwt.sign({ userId: savedUser.id }, JWT_SECRET, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3600000 // 1 hora
        })

        res.status(201).json({ message: "Usuario registrado exitosamente" })
    } catch (error) {
        console.error("Error en registro:", error)
        res.status(500).json({ 
            error: "Error al registrar usuario", 
            details: error.message 
        })
    }
}

export const login = async (req, res) => {
    try {
        // Validar los datos
        const userData = validateUserLogin(req.body)
        if(!userData.success){
            return res.status(400).json({ error: "Datos invalidos", details: user.error.errors })
        }

        const { email, password } = userData.data

        // Buscar el usuario en la base de datos
        const user = await User.findByEmail(email)
        if (!user ) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        res.clearCookie("token")

        // Generar JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" })

        // Configuración de cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3600000 // 1 hora
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

        const isAjaxRequest = req.xhr || req.headers.accept.includes("json") || req.headers["user-agent"]?.includes("Postman")

        const tweets = await Tweet.findUserTweets(req.userId)

        if (isAjaxRequest) {
            return res.json(safeUserData) 
        } 

        

        return res.render("perfil", { safeUserData, tweets })
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