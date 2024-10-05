import { PrismaClient, User } from "@prisma/client";
import { registerDTO, loginDTO} from "../dto/auth.dto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { CustomError, CustomErrorCode } from "../types/error";
const prisma = new PrismaClient


class authService{
     async register (data :registerDTO) :Promise<User | null>  {
        const salt = 10
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const userName = data.email.split('@')[0]
        return await prisma.user.create({
            data:{
                ...data,
                password:hashedPassword,
                username : userName
                
            }
        }) //klo mau buat banyak, pake createmany()
    }
    async login (data:loginDTO) :Promise<{user:Omit<User,"password">, token:string}> {
        const user= await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        if(!user) {
            throw {
                status:404,
                message:"User Not Found",
                code:CustomErrorCode.USER_NOT_EXIST
            }as CustomError
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password) 
        
        if(!isValidPassword) {
            throw {
                status:404,
                message:"User Not Found",
                code:CustomErrorCode.USER_NOT_EXIST
            }as CustomError
        }

        const {password, ...userToSign} = user //ini mengeluarkan password
        
        const secretKey = process.env.JWT_SECRET as string

        const token = jwt.sign(userToSign, secretKey)
        return {
            user:userToSign,
            token:token,
        }
    }

    
}


export default new authService();



