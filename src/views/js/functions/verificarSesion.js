export async function verificarSesion() {
    try {
        const response = await fetch("/auth/checkSesion")
        if (response.ok) {
            const data = await response.json()
            return data.isAuth
        }
    } catch (error) {
        console.error("Error al verificar sesión:", error)
    }
    return false
}

