import { Request, Response, NextFunction } from "express";

export function nameUser(req:Request, res: Response, next: NextFunction)  {
    console.log("halo user")
    next();
}