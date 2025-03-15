import { verificarSesion } from "../functions/verificarSesion.js"

const cardAuth = document.querySelector(".tarjeta-cuenta")

const manejoCardAuth = async () => {
    const usuarioAutenticado = await verificarSesion()

    if (usuarioAutenticado) {
        cardAuth.style.display = "none"
    } else {
        cardAuth.style.display = "flex"
    }
}

manejoCardAuth()
