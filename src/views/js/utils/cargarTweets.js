async function cargarTweets(API, container) {
    try{
        const API_URL = API

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })

        const tweetsData = await response.json()


        const responseContainer = await fetch("../../componentes/tweets.html")
        if (!responseContainer.ok) throw new Error("No se pudo cargar el archivo HTML")

        let template = await responseContainer.text()

        const tweetsHTML = tweetsData.map(tweet => {
            return template
                .replace("{{imagenPerfil}}", tweet.imagen_perfil || "https://unavatar.io/x/fasfasfasdfasdf")
                .replace("{{nombre}}", tweet.nombre || "Usuario")
                .replace("{{nombreUsuario}}", `@${tweet.nombre_usuario || "anonimo"}`)
                .replace("{{tweet}}", tweet.contenido || "Sin contenido")
                .replace("{{imagenTweet}}", tweet.imagenTweet || "");
        }).join("");

        const contenedor = document.querySelector(container)

        contenedor.innerHTML = tweetsHTML
    }catch(error){
        console.error(error)
    }
}

export { cargarTweets }