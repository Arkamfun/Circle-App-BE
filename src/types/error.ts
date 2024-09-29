export type CustomError =  {
    status : Number,
    message : String,
    code : CustomErrorCode,
}

export enum CustomErrorCode {
    USER_NOT_EXIST = "USER_NOT_EXIST",
    THREAD_NOT_EXIST = "THREAD_NOT_EXIST",
    
}