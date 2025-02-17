document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token")

    if (!token) {
        window.location.href = "/auth/login.html"
        return
    }

    try {
        const response = await fetch('/perfil', {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include' 
        })

        if (!response.ok) {
            throw new Error("Error al obtener el perfil del usuario")
        }

        const userData = await response.json()

        //ACTUALIZAR EL DOM
        document.querySelector(".header-perfil h2").textContent = userData.nombre_usuario
        document.querySelector(".article-container h3").textContent = userData.nombre
        document.querySelector(".article-container span").textContent = `@${userData.nombre_usuario.toLowerCase()}`
    } catch (error) {
        console.error(error)
        localStorage.removeItem("token")
        window.location.href = "/auth/login.html"
    }
})