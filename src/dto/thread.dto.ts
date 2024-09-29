export type CreateThreadDTO = {
    title: string
    content: string
    image?: string
}

export type UpdateThreadDTO = CreateThreadDTO & {
    id:number
}