import { verificarSesion } from "../functions/verificarSesion.js"

export const tweetsLikes = async () => {
    document.body.addEventListener("click", async (event) => {
        const botonLike = event.target.closest(".btn-like")
        if (!botonLike) return
    
        const tweetId = parseInt(botonLike.dataset.tweetId, 10)
        const iconoLike = botonLike.querySelector("img.like-icon")
        const contadorLike = botonLike.querySelector(".like-count")
    
        const usuarioAutenticado = await verificarSesion()
        if (!usuarioAutenticado) {
            alert("Debes iniciar sesión para crear un tweet")
            return
        }
        try {
            const response = await fetch(`/likes/${tweetId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            })
    
            if (!response.ok) {
            throw new Error("Error al procesar la petición")
            }
    
            const { liked, totalLikes } = await response.json()
    
            iconoLike.src = liked
            ? "/assets/iconos/hearth-filled.svg"
            : "/assets/iconos/hearth.svg"
    
            contadorLike.textContent = totalLikes
        } catch (error) {
            console.error("Error al dar like:", error)
        }
    })
}
