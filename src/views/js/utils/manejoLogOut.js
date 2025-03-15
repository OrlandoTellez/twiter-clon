import { verificarSesion } from "../functions/verificarSesion.js"
import { cerrarSesion } from "../functions/cerrarSesion.js"

document.addEventListener("DOMContentLoaded", async () => {
  const btnCerrarSesion = document.querySelector(".btn-cerrarSesion")

  const usuarioAutenticado = await verificarSesion()

  if (usuarioAutenticado) {
    btnCerrarSesion.style.display = "flex"
    btnCerrarSesion.style.justifyContent = "center"
  } else {
    btnCerrarSesion.style.display = "none"
  }

  btnCerrarSesion.addEventListener("click", cerrarSesion)
})
