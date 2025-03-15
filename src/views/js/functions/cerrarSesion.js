export async function cerrarSesion() {
    try {
        const response = await fetch("/auth/logout", {
            method: "POST"
        });

        if (response.ok) {
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error)
    }
}