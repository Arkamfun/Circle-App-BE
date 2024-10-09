import { Request, Response, NextFunction } from "express";
import * as replyService from "../service/reply-service";
import { CustomError, CustomErrorCode } from "../types/error";
import { createReplySchema } from "../utils/schemas/create-replay.schema";
import CloudinaryService from "../service/CloudinaryService";
import { log } from "console";





export const createReply = async (req: Request, res: Response) => {
    try {

        const threadId = parseInt(req.params.threadId)
        const userId = (req as any).user.id;
        let imgUrl: string | undefined
        if (req.file) {
            const image = await CloudinaryService.upload(req.file)
            imgUrl = image.secure_url
        }
        // dto.authorId = id

        const dto = { ...req.body, ...(imgUrl && { image: imgUrl }) }
        const value = await createReplySchema.validateAsync(dto)
        dto.threadId = Number(threadId)
        console.log(`ini data dari dto ` + dto);

        const reply = await replyService.createReply(value, +userId, +threadId)
        // console.log(dto + 'dari controller' + id)
        console.log(reply)
        return res.json(reply)
    }

    catch (error) {
        res.status(500).json(error)
    }
}

export const getRepliesbythread = async (req: Request, res: Response) => {
    try {

        const user = (req as any).user
        const threadId = parseInt(req.params.threadId)
        const reply = await replyService.getReplyByThreadId(threadId)
        return res.json(reply)
    } catch (err) {

    }
}
