import z from "zod"

const userValidation = z.object({
    nombre_usuario: z.string().min(3).max(20),
    nombre: z.string().min(3).max(20),
    apellido: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

export function validateUser(user){
    return userValidation.safeParse(user)
}