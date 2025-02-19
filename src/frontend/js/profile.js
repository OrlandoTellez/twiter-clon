import { cargarDatosUsuario } from "./utils/cargarDatosUsuarios.js"
import { editarPerfil } from "./utils/editarPerfil.js"


function init() {
    cargarDatosUsuario()
    editarPerfil()
}

init()
