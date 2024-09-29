import { Request, Response, NextFunction } from "express";
import threadService from "../service/threadService";
import { CustomError, CustomErrorCode } from "../types/error";
import { createThreadSchema } from "../utils/schemas/createThread.schema";

class threadController {
    

    async showAll(req:Request, res:Response) {
        try{
            const threads = await threadService.getAllThreads();
            res.json(threads)
        } catch(error){
           res.status(500).json(error); 
        }
    }

    async findID(req:Request, res:Response) {
        try{
            const {id} = req.params
            const thread = await threadService.getThreadbyId(Number(id)) 
            res.json(thread)
        }catch(error) {
            res.json(error)
        }
    }


    async create(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                    }  
                }
            }
        } 
    */
        try {
            const user = (req as any).user;
            const body = req.body

            const value = await createThreadSchema.validateAsync(body);
            const threads = await threadService.createThread(value, user);
            res.json(threads)
        } catch (error) {
            res.json(error)
            //  {
            //     status: 505,
            //     message: "thread Error!",
            //     code: CustomErrorCode.THREAD_NOT_EXIST,
            // } as CustomError;
        }
    }

    async updateThread(req:Request, res:Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdateThreadDTO"
                    }  
                }
            }
        } 
    */
        try{

                const updateThread = await threadService.updateThread(req.body)
                
    } catch(error) {
        res.status(505).json({message:"thread is not found"})
    }
    
}
    async deleteThread(req:Request, res:Response) {
        try{
            const {id} = req.params
            const threads = await threadService.deleteThread(Number(id))
            res.json(threads)
        }catch(error){
            res.json(error)
        }
    }
}

export default new threadController()