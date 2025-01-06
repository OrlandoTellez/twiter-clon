class Tweet extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    static get observedAttributes(){
        return ["imagenPerfil", "nombre", "nombreUsuario", "tweet"]
    }

    async connectedCallback(){
        const shadow = this.shadowRoot
        shadow.innerHTML = await this.getTemplate()

        this.imagenPerfil = shadow.querySelector("img")
        this.nombre = shadow.querySelector("h3")
        this.nombreUsuario = shadow.querySelector("p")
        this.tweet = shadow.querySelector(".tweet")

        this.imagenPerfil.src = this.getAttribute("imagenPerfil")
        this.nombre.innerText = this.getAttribute("nombre")
        this.nombreUsuario.innerText = this.getAttribute("nombreUsuario")
        this.tweet.innerText = this.getAttribute("tweet")

    }

    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case "imagenPerfil":
                if (this.imagenPerfil){
                    return this.imagenPerfil.src = newValue
                }
                break
            case "nombre":
                if(this.nombre){
                    return this.nombre.innerText = newValue
                }
                break
            case "nombreUsuario":
                if(this.nombreUsuario){
                    return this.nombreUsuario.innerText = newValue
                }
                break
            case "tweet":
                if(this.tweet){
                    return this.tweet.innerText = newValue
                }
                break
            default:
                break
        }
    }

    async getTemplate(){
        const archivo= await fetch("../componentes/tweets.html")
        const plantilla = await archivo.text()
        return plantilla
    }
}

class HeaderUp extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        const shadow = this.shadowRoot
        shadow.innerHTML = await this.getTemplate()
    }

    async getTemplate(){
        const archivo = await fetch("../componentes/header-up.html")
        const plantilla = await archivo.text()
        return plantilla
    }
}

class HeaderInline extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        const shadow = this.shadowRoot
        shadow.innerHTML = await this.getTemplate()
    }

    async getTemplate(){
        const archivo = await fetch("../componentes/header-inline.html")
        const plantilla = await archivo.text()
        return plantilla
    }
}

customElements.define("tweet-user", Tweet)
customElements.define("header-app", HeaderUp)
customElements.define("header-inline", HeaderInline)



