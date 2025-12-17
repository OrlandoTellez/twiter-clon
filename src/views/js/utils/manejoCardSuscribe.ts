import { verificarSesion } from "../functions/verificarSesion.js"

const cardSuscribe = document.querySelector(".tarjeta-suscribirse--index")

const manejoCardAuth = async () => {
    const usuarioAutenticado = await verificarSesion()

    if (usuarioAutenticado) {
        cardSuscribe.style.marginTop = "70px"
    } else {
        cardSuscribe.style.marginTop = "0px"
    }
}

manejoCardAuth()