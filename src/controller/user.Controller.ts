import { Request, Response } from "express";
import userService from "../service/userService";
import { createUserSchema } from "../utils/schemas/create-user.schema";
import { updateUserSchema } from "../utils/schemas/updateuser.schema";

interface requestWithUser extends Request{
    user? : any
} 

class UserController {

    async findAll(req: Request, res: Response) {
        const users = await userService.getAllUsers()
        res.json(users)
    }
    async findById(req: Request, res: Response) {
        try{
            const { id } = req.params
            const users = await userService.getUserById(Number(id))
            res.json(users)
        } catch(error) {
            res.json(error)
        }

    }
    async getUser(req:requestWithUser, res:Response ) {
        const userId = req.user.id
        const user = await userService.getUser(userId)
        res.json(user)
    }
    
    async findByEmail(req: Request, res: Response) {
        const email = req.params.email
        const users = await userService.getUserByEmail(String(email))
        res.json(users)
    }

    async create(req: Request, res: Response) {
        try {
            // value ini adalah hasil req.body yang sudah di cek sama Joi
            const value = await createUserSchema.validateAsync(req.body)
            

            // dimasukkan ke createUser()
        const users = await userService.createUser(value)
        res.json(users)
    } catch(error) {
        res.json(error)
    }
    }
    async update(req: requestWithUser, res: Response) {
        try {
            const userId = parseInt(req.params.id)
            const value = await updateUserSchema.validateAsync(req.body)
        const users = await userService.updateUser(req.body)
        res.json(users)} 
        catch(error) {
            res.json(error)
        }

    }


}
export default new UserController()