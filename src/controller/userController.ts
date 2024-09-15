import { Request, Response } from "express";
import { getAllUsers, getUserByEmail, getUserByName, getUserById, } from "../service/userService";

class UserController {

    async findAll(req: Request, res: Response) {
        const users = await getAllUsers()
        res.json(users)
    }
    async findById(req: Request, res: Response) {
        const id = req.params.id
        const users = await getUserById(Number(id))
        res.json(users)
    }
    async findByEmail(req: Request, res: Response) {
        const email = req.params.email
        const users = await getUserByEmail(String(email))
        res.json(users)
    }
    async findByName(req: Request, res: Response) {
        const username = req.params.name
        const users = await getUserByName(String(username))
        res.json(users)
    }
}
export default new UserController()