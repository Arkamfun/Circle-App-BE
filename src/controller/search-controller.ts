import { Request, Response } from "express";
import { searchService } from "../service/search-service";
import {RequestWithUser} from "../types/user"

export const searchController = async (req: RequestWithUser, res: Response) => {
    const { query } = req.query
    const userId = req.user?.id
    const user = await searchService(query as string, userId)
    res.json(user)
}