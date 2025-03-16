import { verificarSesion } from "../functions/verificarSesion.js"

const formTweet = document.querySelector(".tweet-container--input")
const inputTweet = document.querySelector(".tweet-input")
const inputImagen = document.querySelector("#imagenTweet")
const contenedorImagen = document.querySelector(".btn-foto")
const previewImage = document.querySelector(".preview-image")

contenedorImagen.addEventListener("click", () => {
  inputImagen.click()
})

// Función para previsualizar la imagen seleccionada
inputImagen.addEventListener("change", () => {
  if (inputImagen.files.length > 0) {
    const file = inputImagen.files[0]
    const imageUrl = URL.createObjectURL(file)
    previewImage.innerHTML = `<img src="${imageUrl}" alt="Preview">`
    previewImage.style.paddingTop = "20px"
    previewImage.style.paddingBottom = "20px"
  } else {
    previewImage.innerHTML = "" 
  }
})

const crearTweet = () => {
  formTweet.addEventListener("submit", async (e) => {
    e.preventDefault()

    const usuarioAutenticado = await verificarSesion()
    if (!usuarioAutenticado) {
      alert("Debes iniciar sesión para crear un tweet")
      return
    }

    const formData = new FormData()
    formData.append("contenido", inputTweet.value.trim())

    if (inputImagen.files[0]) {
      formData.append("imagenTweet", inputImagen.files[0])
    }

    if (!formData.get("contenido")) {
      alert("El tweet no puede estar vacío")
      return
    }

    try {
      const API_URL = "/tweets"

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if (response.ok) {
        inputTweet.value = ""
        inputImagen.value = ""
        previewImage.innerHTML = "" 
        window.location.reload()
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Error al crear el tweet")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un problema al enviar el tweet")
    }
  })
}

crearTweet()