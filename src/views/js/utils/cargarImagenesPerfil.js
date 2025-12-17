const $ = (e) => document.querySelector(e)


export const cargarImagenesPerfil = async () => {
    try {
        const [imageProfile, imageBanner] = await Promise.all([
            fetch("/image/upload-profile", { credentials: "include" }),
            fetch("/image/upload-banner", { credentials: "include" })
        ])

        if (!imageProfile.ok || !imageBanner.ok) throw new Error("Error al cargar las imágenes")

        const imageJsonProfile = await imageProfile.json()
        const imageJsonBanner = await imageBanner.json()

        const $imagenPerfil = $("#imagenPerfil")
        const $imagenFondo = $("#imagenFondo")

        $imagenPerfil.src = imageJsonProfile.imagenPerfilUrl || "https://unavatar.io/x/1sdfaf23asd"
        $imagenFondo.src = imageJsonBanner.imagenFondoUrl || "https://img.freepik.com/fotos-premium/es-escena-al-aire-libre_915164-23794.jpg?semt=ais_hybrid"

    } catch (error) {
        console.log("Error al cargar las imágenes:", error)
    }
}