import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { CustomError, CustomErrorCode } from "../types/error";

const prisma = new PrismaClient


class userService{

    async  getUser(id:number) :Promise<Omit<User,"password">>  {
        
        const user = await  prisma.user.findUnique({
            where: {
                id
            }, 
        });
        if(!user) {
            throw{
                status: 404,
                message:"user tidak ditemukan",
                code: CustomErrorCode.USER_NOT_EXIST,
            } as CustomError    
        }

        return user; 
    }
     async  getAllUsers() :Promise<User[]> {
        return await prisma.user.findMany();
    }
    
     async  getUserById(id:number) :Promise<User | null>  {
        const user = await  prisma.user.findUnique({
            where: {
                id:id
            }, 
        });
        if(!user) {
            throw{
                status: 404,
                message:"user tidak ditemukan",
                code: CustomErrorCode.USER_NOT_EXIST,
            } as CustomError    
        }

        return user; 
    }
    
     async  getUserByEmail(email:string) :Promise<User | null>  {
        return await prisma.user.findFirst({
            where: {
                email :email,
            }, 
        });
    }
    
     async  createUser (data :CreateUserDTO) :Promise<User | null>  {
        return await prisma.user.create({
            data:{
                
                fullName:data.fullName,
                email:data.email,
                password:data.password
            }
        }) //klo mau buat banyak, pake createmany()
    }
     async updateUser (data :UpdateUserDTO, id: number) :Promise<{user:Pick<User, "fullName" | "username" | "biografi" | "id">}
     >  {
        const user = await prisma.user.findUnique({
            where: {
              id: id //ambil data id dari hasil decode token
            }
        })
    
        if(!user) {
            throw{
                status: 404,
                message:"user tidak ditemukan",
                code: CustomErrorCode.USER_NOT_EXIST,
            } as CustomError    
        }
        const updateUser = await prisma.user.update({
            where: {
                id:id
            },
            data : {
                fullName:data.fullName || user.fullName,
                username:data.username || user.username,
                biografi:data.biografi || user.biografi,

                
            },
            select: {
                id:true,
                fullName:true,
                username:true,
                biografi: true,
                password:false,
            }
        })
        return {
            user: updateUser
        }
                //klo mau buat banyak, pake createmany()
    }
    async deleteUser (id:number) :Promise<User | null>  {
 const user = await prisma.user.findUnique({
            where: {
              id:id //ambil data id dari hasil decode token
            }
        })
    
        if(!user) {
            throw{
                status: 404,
                message:"user tidak ditemukan",
                code: CustomErrorCode.USER_NOT_EXIST,
            } as CustomError    
        }
    
        return await prisma.user.delete({
            where: {
                id:id,
            }
        }) //klo mau buat banyak, pake createmany()
       
    }
}


export default new userService();



