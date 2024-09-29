import { PrismaClient, Thread, User } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/thread.dto";
import {CustomError, CustomErrorCode } from "../types/error";

const prisma = new PrismaClient();

class threadService {
    async getAllThreads():Promise<Thread[]>{
        return await prisma.thread.findMany({
            include:{
                user:true,
            },
        });
    }

    async getThreadbyId(id:number):Promise<Thread|null>{
        const thread = await prisma.thread.findUnique({
            where:{
                id: id,
            },
        })
        if(!thread) {
            throw{
                status:404,
                message:"thread is not found!",
                code: CustomErrorCode.THREAD_NOT_EXIST,
            } as CustomError;
        }    

        return thread;
    }

    async createThread(data:CreateThreadDTO, user:User):Promise<Thread |null>{
        if(!user) {
            throw{
                status:404,
                message:"user is not found!",
                code: CustomErrorCode.USER_NOT_EXIST,
            } as CustomError;
        }
        return await prisma.thread.create({
            data:{
                title:data.title,
                content:data.content,
                Image:data.image,
                userId: user.id,
            }
        })
    }
    async updateThread(dto:UpdateThreadDTO):Promise<Thread | null> {
        const thread = await prisma.thread.findFirst({
            where:{
                id: dto.id,
            },
            
        })
        if(!thread) {
            throw{
                status:404,
                message:"thread is not found!",
                code: CustomErrorCode.THREAD_NOT_EXIST,
            } as CustomError;
        }
        if(dto.content) {
            thread.content = dto.content
        }
        if(dto.image) {
            thread.Image = dto.image
        }

        return await prisma.thread.update({
            where:{id : dto.id},
            data:thread,
        })
    }

    async deleteThread(id:number):Promise<Thread | null> {
        const thread = prisma.thread.findFirst({
            where:{
                id: id
            },
        })
        if(!thread) {
            throw{
                status:404,
                message:"thread is not found!",
                code: CustomErrorCode.THREAD_NOT_EXIST,
            } as CustomError;
        }
        return await prisma.thread.delete({
            where:{
                id:id
            }
        })
    }
}

export default new threadService();