import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient

export async function getAllUsers() :Promise<User[]> {
    return await prisma.user.findMany();
}

export async function getUserById(id:number) :Promise<User | null>  {
    return await prisma.user.findFirst({
        where: {
            id:id
        }, 
    });
}

export async function getUserByEmail(email:string) :Promise<User | null>  {
    return await prisma.user.findFirst({
        where: {
            email :email,
        }, 
    });
}

export async function getUserByName(name:string) :Promise<User | null>  {
    return await prisma.user.findFirst({
        where: {
            name :name,
        }, 
    });
}




