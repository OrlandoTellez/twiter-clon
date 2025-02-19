class TweetUser extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["imagenPerfil", "nombre", "nombreUsuario", "tweet", "imagenTweet"]
  }

  async connectedCallback() {
    await this.loadTemplate()
  }

  async loadTemplate() {
    try {
      const response = await fetch("../componentes/tweets.html")
      if (!response.ok) throw new Error("No se pudo cargar el archivo HTML")

      const template = await response.text()
      const filledTemplate = this.fillTemplate(template)
      
      this.shadowRoot.innerHTML = filledTemplate
    } catch (error) {
      console.error("Error cargando el archivo HTML:", error)
    }
  }

  fillTemplate(template) {
    return template
      .replace("{{imagenPerfil}}", this.getAttribute("imagenPerfil") || "")
      .replace("{{nombre}}", this.getAttribute("nombre") || "")
      .replace("{{nombreUsuario}}", this.getAttribute("nombreUsuario") || "")
      .replace("{{tweet}}", this.getAttribute("tweet") || "")
      .replace("{{imagenTweet}}", this.getAttribute("imagenTweet") || "");
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML) {
      this.loadTemplate();
    }
  }
}


class HeaderUp extends HTMLElement {
  constructor() {
    super()
  }
  async connectedCallback() {
    const response = await fetch("../componentes/header-up.html")
    this.innerHTML = await response.text()
  }
}

class HeaderInline extends HTMLElement {
  constructor() {
    super()
  }
  async connectedCallback() {
    const response = await fetch("../componentes/header-inline.html")
    this.innerHTML = await response.text()
    const btnCerrarSesion = this.querySelector(".btn-cerrarSesion")

    const usuarioAutenticado = await this.verificarSesion()

    if(usuarioAutenticado){
      btnCerrarSesion.style.display = "block"
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

customElements.define("tweet-user", TweetUser)
customElements.define("header-up", HeaderUp)
customElements.define("header-inline", HeaderInline)
