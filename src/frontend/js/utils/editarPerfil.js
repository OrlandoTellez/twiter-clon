const $ = (e) => document.querySelector(e)

export const editarPerfil = () => {
    const $btnEditProfile = $('#btn-editProfile')
    
    $btnEditProfile.addEventListener('click', () => {
        const modal = document.createElement('div')
        modal.innerHTML = formPerfil()
        document.body.appendChild(modal)

        const $btnCerrar = modal.querySelector('.btn-cerrar')

        $btnCerrar.addEventListener('click', () => {
            document.body.removeChild(modal)
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
                        <input type="file" name="image" id="file-image" accept="image/jpeg, image/png" required hidden>
                    </div>
                    <picture>
                        <img src="" id="image-preview">
                    </picture>
                </div>

                <div class="upload-container-fotoPerfil">
                    <div class="upload-area">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                        <input type="file" name="image" id="file-image" accept="image/jpeg, image/png" required hidden>
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