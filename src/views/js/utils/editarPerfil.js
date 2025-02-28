const $ = (e) => document.querySelector(e);
export const editarPerfil = () => {
    const $btnEditProfile = document.querySelector('#btn-editProfile')

    $btnEditProfile.addEventListener('click', () => {
        const modal = document.createElement('div')
        modal.innerHTML = formPerfil()
        document.body.appendChild(modal)

        const $btnCerrar = modal.querySelector('.btn-cerrar')

        $btnCerrar.addEventListener('click', () => {
            document.body.removeChild(modal)
        })

        const $form = modal.querySelector('.profile-form')

        $form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const fileFondo = modal.querySelector('#file-fondo').files[0]
            const filePerfil = modal.querySelector('#file-perfil').files[0]
            const nombre = modal.querySelector('#name').value
            const bio = modal.querySelector('#bio').value

            try {
                if (filePerfil) {
                    const formDataPerfil = new FormData()
                    formDataPerfil.append("imagenPerfil", filePerfil)
                    formDataPerfil.append("nombre", nombre)
                    formDataPerfil.append("bio", bio)

                    const responsePerfil = await fetch("/image/upload-profile", {
                        method: 'PATCH',
                        body: formDataPerfil,
                        credentials: 'include'
                    })

                    const dataPerfil = await responsePerfil.json()
                    if (!responsePerfil.ok) throw new Error(dataPerfil.error)
                    alert("Imagen de perfil subida correctamente")
                }

                if (fileFondo) {
                    const formDataBanner = new FormData()
                    formDataBanner.append("imagenBanner", fileFondo)

                    const responseBanner = await fetch("/image/upload-banner", {
                        method: 'PATCH',
                        body: formDataBanner,
                        credentials: 'include'
                    })

                    const dataBanner = await responseBanner.json()
                    if (!responseBanner.ok) throw new Error(dataBanner.error)
                    alert("Imagen de fondo subida correctamente")
                }

            } catch (error) {
                console.error("Error en el envío:", error)
            }
        })
    })
}



const formPerfil = () => {
    return `
    <div class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Editar perfil</h2>
                <img src="./assets/iconos/exit.svg" alt="icono-salir" class="btn-cerrar">
            </div>
            <form class="profile-form">
                <div class="upload-container-fondo">
                    <div class="upload-area">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                        <input type="file" name="imagenBanner" id="file-fondo" accept="image/jpeg, image/png">
                    </div>
                    <picture>
                        <img src="" id="image-preview">
                    </picture>
                </div>

                <div class="upload-container-fotoPerfil">
                    <div class="upload-area">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                        <input type="file" name="imagenPerfil" id="file-perfil" accept="image/jpeg, image/png">
                    </div>
                    <picture>
                        <img src="" id="image-preview">
                    </picture>
                </div>
                <label class="form-label" for="name">Nombre</label>
                <input id="name" type="text" class="form-input" placeholder="pasas" />
                <label class="form-label" for="bio">Biografía</label>
                <textarea id="bio" class="form-textarea" rows="4" placeholder="Escribe tu biografía aquí..."></textarea>
                <button type="submit" class="submit-button">Guardar</button>
            </form>
        </div>
    </div>
    `
}