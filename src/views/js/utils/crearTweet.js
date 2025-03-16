import { verificarSesion } from "../functions/verificarSesion.js"

const formTweet = document.querySelector(".tweet-container--input")
const inputTweet = document.querySelector(".tweet-input")

const crearTweet = () => {
  formTweet.addEventListener("submit", async (e) => {
    e.preventDefault()

    const tweet = {
      contenido: inputTweet.value.trim(),
    }

    if (!tweet.contenido) {
      alert("El tweet no puede estar vacio")
      return
    }

    try {
      const API_URL = "/tweets"

      const usuarioAutenticado = await verificarSesion()

      if (usuarioAutenticado) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tweet),
        });
        if (response.ok) {
          inputTweet.value = ""
          window.location.reload()
        } else {
          const errorData = await response.json()
          alert(errorData.error || "Error al crear el tweet")
        }
      } else {
        alert("Debes iniciar sesión para crear un tweet")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un problema al enviar el tweet")
    }
  })
}

crearTweet()