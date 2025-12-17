document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = {
      nombre_usuario: e.target.nombre_usuario.value,
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    try {
        const API_URL = "/auth/registro"

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
      
      if (response.ok) {
        window.location.href = '/perfil'
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Error en el registro')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión con el servidor')
    }
})