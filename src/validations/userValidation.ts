import z from "zod"

const userRegisterValidation = z.object({
    nombre_usuario: z.string().min(3).max(20),
    nombre: z.string().min(3).max(20),
    apellido: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

const userLoginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

export function validateUserRegister(user: any){
    return userRegisterValidation.safeParse(user)
}

export function validateUserLogin(user: any){
    return userLoginValidation.safeParse(user)
}