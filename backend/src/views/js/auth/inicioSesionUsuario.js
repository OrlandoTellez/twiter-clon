const form = document.getElementById("login-form")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = {
    email: e.target.email.value,
    password: e.target.password.value,
  }

  try {
    const API_URL = "/auth/login"

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      window.location.href = "/perfil"
    } else {
      alert(data.error || "Error en el inicio de sesión")
    }
  } catch (error) {
    console.error("Error:", error)
    alert("Error de conexión con el servidor")
  }
})
