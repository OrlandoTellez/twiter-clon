import { cargarImagenesPerfil } from "./cargarImagenesPerfil.js"

const $ = (e) => document.querySelector(e)

export const cargarDatosUsuario = async () => {
    try{
        const response = await fetch("/perfil", {
            credentials: "include",
            headers: {
                "Accept": "application/json" 
            }
        })
    
        if (!response.ok) {
            window.location.href = "/auth/login"
            throw new Error("Error al obtener el perfil del usuario")
        }
    
        const userData = await response.json()
    
        // OBTENER ELEMENTOS DEL DOM
        const $headerName = $("#profileName")
        const $profileName = $("#profileUsername")
        const $profileBio = $("#profileBio")
        const $profileHandle = $("#profileHandle")
        const $createDate = $("#createDate")
    
        // FORMATEAR FECHA EN FORMATO 00-00-0000
        const createDate = userData.fecha_creacion
        const date = createDate.split("T")[0]
    
        // ACTUALIZAR EL DOM
        $headerName.textContent = userData.nombre
        $profileName.textContent = userData.nombre
        $profileBio.textContent = userData.descripcion
        $profileHandle.textContent = `@${userData.nombre_usuario.toLowerCase()}`
        $createDate.textContent = date

        cargarImagenesPerfil()
    }catch (error) {
        console.error(error)
    }
}

