import { PrismaClient } from "@prisma/client";
import { CustomError } from "../types/error";

const prisma = new PrismaClient();

export const searchService = async (query: string, userId: number) => {
    if(!query) {
        throw new Error("Query is not filled"); 
    }
    return await prisma.user.findMany({
        where: {
            AND: [
                {id: {not: userId}},
                {
                    OR: [
                        {username: {contains: query, mode: "insensitive"}},
                        {fullName: {contains: query, mode: "insensitive"}},
                    ]
                }
            ]
        }, select: {
            id:true,
            email:true,
            fullName:true,
            username:true,
            photoprofil:true,
        }
    })
        }