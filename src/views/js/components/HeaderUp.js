class HeaderUp extends HTMLElement {
    constructor() {
      super()
    }
    async connectedCallback() {
      const response = await fetch("../componentes/header-up.ejs")
      this.innerHTML = await response.text()
    }
}

customElements.define("header-up", HeaderUp)
