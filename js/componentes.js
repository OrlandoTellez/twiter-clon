class Tweet extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        const shadow = this.shadowRoot
        shadow.innerHTML = await this.getTemplate()
    }

    async getTemplate(){
        const archivo= await fetch("../componentes/tweets.html")
        const plantilla = await archivo.text()
        return plantilla
    }
}

customElements.define("tweet-user", Tweet)



