import { Router } from "express"

export const indexRoute = Router()

indexRoute.get("/", (req, res) => {
    res.sendFile(join(ROOT_DIR, 'index.html'))
})

indexRoute.get(['/perfil', '/notificaciones', '/explorar'], (req, res) => {
    res.sendFile(join(ROOT_DIR, 'index.html'))
})