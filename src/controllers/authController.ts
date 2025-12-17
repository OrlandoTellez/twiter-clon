import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import User from "../models/user"
import Tweet from "../models/tweet"
import dotenv from "dotenv"
import { validateUserRegister, validateUserLogin } from "../validations/userValidation"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export const getRegister = (req: Request, res: Response) => res.render("auth/registro")
export const getLogin = (req: Request, res: Response) => res.render("auth/login")

export const register = async (req: Request, res: Response) => {
    try {
        const user = validateUserRegister(req.body);

        if (!user.success) {
            return res.status(400).json({ error: "Datos inválidos", details: user.error.errors });
        }

        const { nombre_usuario, nombre, apellido, email, password } = user.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ nombre_usuario, nombre, apellido, email, password: hashedPassword });

        const savedUser = await User.findByEmail(email)

        if (!savedUser || !JWT_SECRET) {
            return res.status(500).json({ error: "Error interno del servidor" })
        }

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
            details: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const userData = validateUserLogin(req.body)
        if(!userData.success){
            return res.status(400).json({ error: "Datos invalidos", details: userData.error.errors })
        }

        const { email, password } = userData.data

        const user = await User.findByEmail(email)
        if (!user ) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }

        res.clearCookie("token")

        if (!JWT_SECRET) {
            return res.status(500).json({ error: "Error interno del servidor" })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" })

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
                username: user.nombre_usuario,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Error desconocido" })
    }
}

export const perfil = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "No autorizado" })
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }

        const tweets = await Tweet.findUserTweets(req.userId)
        const { password, ...safeUserData } = user;

        const xRequestedWith = req.headers["x-requested-with"];
        if (
            xRequestedWith &&
            typeof xRequestedWith === "string" &&
            xRequestedWith.toLowerCase() === "xmlhttprequest"
        ) {
            return res.json({ user: safeUserData, tweets })
        }

        return res.render("perfil", {
            safeUserData,
            tweets,
            authenticated: true
        })
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Error desconocido" })
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token")
    res.json({
        message: "Sesion cerrada exitosamente"
    })
}

export const checkSesion = async (req: Request, res: Response) => {
    try{
        const token = req.cookies.token

        if(!token || !JWT_SECRET){
            return res.json({ isAuth: false })
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        const user = await User.findById(decoded.userId)

        if(!user){
            return res.json({ isAuth: false })
        }

        res.json({
            isAuth: true,
            user: {
                id: user.id,
                username: user.nombre_usuario,
                email: user.email
            }
        })
    }catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Error desconocido", isAuth: false })
    }
}