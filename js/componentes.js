class TweetUser extends HTMLElement {
    async connectedCallback() {
        const imagenPerfil = this.getAttribute('imagenPerfil') || '';
        const nombre = this.getAttribute('nombre') || '';
        const nombreUsuario = this.getAttribute('nombreUsuario') || '';
        const tweet = this.getAttribute('tweet') || '';

        try {
            const response = await fetch('../componentes/tweets.html');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo HTML');
            }

            const template = await response.text();

            this.innerHTML = template
                .replace('{{imagenPerfil}}', imagenPerfil)
                .replace('{{nombre}}', nombre)
                .replace('{{nombreUsuario}}', nombreUsuario)
                .replace('{{tweet}}', tweet);
        } catch (error) {
            console.error('Error cargando el archivo HTML:', error);
        }
    }
}

class HeaderUp extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('../componentes/header-up.html');
        this.innerHTML = await response.text();
    }
}

class HeaderInline extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('../componentes/header-inline.html');
        this.innerHTML = await response.text();
    }
}

customElements.define("tweet-user", TweetUser)
customElements.define("header-up", HeaderUp)
customElements.define("header-inline", HeaderInline)



