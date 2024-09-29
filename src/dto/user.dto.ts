export type CreateUserDTO = {
    fullName : string,
    email : string,
    password : string
}

// kenapa dipisah ?, agar bisa berdiri sendiri, di kasus ini user tidak boleh update email
export type UpdateUserDTO = {
    id: number,
    username: string,
    biografi: string,
    fullName : string,
    password : string
}