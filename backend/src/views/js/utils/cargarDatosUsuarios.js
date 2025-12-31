import { cargarImagenesPerfil } from "./cargarImagenesPerfil.js"

const $ = (e) => document.querySelector(e)

export const cargarDatosUsuario = async () => {
    try{
        const response = await fetch("/api/perfil", {
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
    
        if (!response.ok) {
            window.location.href = "/auth/login"
            throw new Error("Error al obtener el perfil del usuario")
        }
    
        const userData = await response.json()
        console.log(userData)
        // OBTENER ELEMENTOS DEL DOM
        const $headerName = $("#profileName")
        const $profileName = $("#profileUsername")
        const $profileBio = $("#profileBio")
        const $profileHandle = $("#profileHandle")
        const $createDate = $("#createDate")
    
        // FORMATEAR FECHA EN FORMATO 00-00-0000
        const createDate = userData.user.fecha_creacion
    
        if (!createDate) {
            console.error("Error: fecha_creacion es undefined", userData);
            return;
        }

        const date = createDate.split("T")[0];

        // ACTUALIZAR EL DOM
        $headerName.textContent = userData.user.nombre
        $profileName.textContent = userData.user.nombre
        $profileBio.textContent = userData.user.descripcion
        $profileHandle.textContent = `@${userData.user.nombre_usuario.toLowerCase()}`
        $createDate.textContent = date

        cargarImagenesPerfil()
    }catch (error) {
        console.error(error)
    }
}

