document.addEventListener("DOMContentLoaded", async () => {

    try {
        const response = await fetch('/perfil', {
            credentials: 'include' 
        })

        if (!response.ok) {
            throw new Error("Error al obtener el perfil del usuario")
        }

        const userData = await response.json()

        //ACTUALIZAR EL DOM
        document.querySelector(".header-perfil h2").textContent = userData.nombre
        document.querySelector(".article-container h3").textContent = userData.nombre
        document.querySelector(".article-container span").textContent = `@${userData.nombre_usuario.toLowerCase()}`
    } catch (error) {
        console.error(error)
        window.location.href = "/auth/login.html"
    }
})