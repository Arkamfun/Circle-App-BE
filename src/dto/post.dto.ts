export type createPostDTO = {
    authorId : number;
    content?:string;
    image?:string,
}

export type postResponseDTO = {
    id:number;
    content:string;
    image?:string;
    authorId:number;
    createdAt:Date;
    updateAt:Date;
}

export type UpdatePostDTO = createPostDTO & {
    id:number;
}