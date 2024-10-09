import { PrismaClient, Reply } from "@prisma/client";
import { ReplyDTO,UpdateReplyDTO } from "../dto/reply.dto";
import { CustomError } from "../middleware/errorhandler"; 
import { threadId } from "worker_threads";
import { log } from "console";

const prisma = new PrismaClient();

export const createReply = async (dto: ReplyDTO, authorId: number, threadId: number): Promise<Reply|null> => {
    console.log('sebelum');
    try {
        const reply = await prisma.reply.create({
            data: {
                content: dto.content,
                image: dto.image,
                authorId: authorId,
                threadId:threadId,
            }
        })
        console.log('sesudah');
            
    return reply
    } catch(error) {
        console.log(error);
        return null
    }
}
    

    export const getReplyByThreadId = async (threadId: number): Promise<Reply[] | null> => {
        const reply = await prisma.reply.findMany({
            where: {
                threadId: threadId
            }
        })
        console.log(reply)
        return reply
    }
    // const replyCount = await prisma.reply.count({
    //     where: {threadId: threadId},
        
    // })
    // await prisma.thread.update({
    //     where: {id: threadId},
    //     data: {repliesCount: replyCount}

    // })


    

    // async deleteReply(id:number): Promise<Reply | any> {
    //     const reply = prisma.reply.findUnique({
    //         where: {
    //             id: id

    //         }
    //     });
    //     if(!reply) {
    //         throw new CustomError("Reply not found", 404);
    //     }

    //     await prisma.reply.delete({
    //         where: {
    //             id: id
    //         }
    //     });

    //     const replyCount = await prisma.reply.count({
    //         where: {threadId: reply.thread},
    //     });

    //     await prisma.reply.update({
    //         where: {id:reply.threadId},
    //         data: {repliesCount: replyCount}
    //     })

    //     return reply;
    

    // }
