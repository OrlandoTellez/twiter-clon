async function publicarTweets(contenedor, atributos) {
    try {
        const response = await fetch("../../componentes/tweets.ejs")
        if (!response.ok) throw new Error("No se pudo cargar el archivo HTML")

        let template = await response.text()
        template = template
            .replace("{{imagenPerfil}}", atributos.imagenPerfil || "")
            .replace("{{nombre}}", atributos.nombre || "")
            .replace("{{nombreUsuario}}", atributos.nombreUsuario || "")
            .replace("{{tweet}}", atributos.tweet || "")
            .replace("{{imagenTweet}}", atributos.imagenTweet || "")

        const tweetElement = document.createElement("div")
        tweetElement.classList.add("tweet")
        tweetElement.innerHTML = template
        contenedor.prepend(tweetElement)
    } catch (error) {
        console.error("Error cargando el archivo HTML:", error)
    }
}
const botonTweet = document.querySelector(".btn-postear")
const inputTweet = document.querySelector(".tweet-input")
const contenedorTweets = document.querySelector(".tweet-container--index")

botonTweet.addEventListener("click", () => {
    publicarTweets(contenedorTweets, {
        imagenPerfil: "https://unavatar.io/x/1saf21asd21asdf2",
        nombre: "",
        nombreUsuario: "@",
        tweet: inputTweet.value,
        imagenTweet: ""
    })
})
