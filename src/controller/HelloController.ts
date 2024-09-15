import { Request, Response } from "express";
import { sayHello, } from "../service/HelloService";
import { helloUser } from "../service/usernameService";
import BadRequestError from "../errors/bad-request";

export async function HelloController(req: Request, res: Response) {
        const hello = sayHello()
        const hadi = helloUser("hadi")
        res.send(`${hello} ${hadi}`)


}