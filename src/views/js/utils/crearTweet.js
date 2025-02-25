const formTweet = document.querySelector('.tweet-container--input')
const inputTweet = document.querySelector('.tweet-input')

formTweet.addEventListener('submit', async (e) => {
    e.preventDefault()

    const tweet = {
        contenido: inputTweet.value.trim()
    }

    if(!tweet.contenido){
        alert("El tweet no puede estar vacio")
        return
    }

    try {
        const API_URL = "/content/tweets"

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tweet)
        })
        if (response.ok) {
            alert("tweet creado con exito")
            inputTweet.value = ""
        } else {
            const errorData = await response.json()
            alert(errorData.error || 'Error al crear el tweet')
        }
        
    } catch (error) {
        console.error('Error:', error)
        alert('Hubo un problema al enviar el tweet');
    }
}
)
