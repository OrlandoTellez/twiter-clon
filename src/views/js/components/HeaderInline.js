class HeaderInline extends HTMLElement {
    constructor() {
        super()
    }
    async connectedCallback() {
        const response = await fetch("../componentes/header-inline.ejs")
        this.innerHTML = await response.text()
        const btnCerrarSesion = this.querySelector(".btn-cerrarSesion")

        const usuarioAutenticado = await this.verificarSesion()

        if(usuarioAutenticado){
            btnCerrarSesion.style.display = "flex"
            btnCerrarSesion.style.justifyContent = "center"
        }else{
            btnCerrarSesion.style.display = "none"
        }

        btnCerrarSesion.addEventListener("click", async () => {
            await this.cerrarSesion()
        })

    }

    async verificarSesion(){
        try{
            const response = await fetch("auth/checkSesion")
            if(response.ok){
                const data = await response.json()
                return data.isAuth
            }

        }catch(error){
            console.error(error)
        }
    }

    async cerrarSesion(){
        try{
            const response = await fetch("auth/logout", {
                method: "POST"
            })

            if(response.ok){
                window.location.href = "/"
            }
        }catch(error){
            console.error(error)
        }
    }
}
  
customElements.define("header-inline", HeaderInline)