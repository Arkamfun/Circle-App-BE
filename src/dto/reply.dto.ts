export type ReplyDTO = {
    image?:string | null,
    content?:string | null,
    threadId:number | null,
    authorId:number | null
}

export type UpdateReplyDTO = {
    id:number,
    content?:string,
    image?:string,
}