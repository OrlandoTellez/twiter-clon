const botonTweet = document.querySelector(".btn-postear")
const inputTweet = document.querySelector(".tweet-input")

botonTweet.addEventListener("click", () => {
    const nuevoTweet = document.createElement("tweet-user")

    nuevoTweet.setAttribute("imagenPerfil", "https://unavatar.io/x/IbaiLlanos")
    nuevoTweet.setAttribute("nombre", "IbaiLlanos")
    nuevoTweet.setAttribute("nombreUsuario", "@IbaiLlanos")
    nuevoTweet.setAttribute("tweet", inputTweet.value)

    const contenedorTweets = document.querySelector(".tweet-container--index")

    contenedorTweets.prepend(nuevoTweet)


    
})