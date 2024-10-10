import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { RequestWithUser } from "../types/user";

const prisma = new PrismaClient();

class LikeThreadController {
    async getLikes(req: RequestWithUser, res: Response) {
        try {
            // buat variabel untuk menampung kebutuhan dari databasenya
            // disini variabelnya adalah threadId dan userId yang akan digunakan sebagai acuan untuk mengambil data dari database
            const threadId = Number(req.params.threadId);
            const userId = req.user.id;
            const thread = await prisma.thread.findUnique({
                where: { id: threadId },
                include: {
                    Likes: {
                        where: { userId: userId }
                    }
                }
            })
            if (!thread) {
                return console.error(404, "Thread not found",);
            }
            const isLiked = thread.Likes && thread.Likes.length > 0;
            const likesCount = thread.Likes ? thread.Likes.length : 0;
            res.json({ isLiked, likesCount });
        } catch (Error) {
            console.log(Error)
        }

    }


    async likeThread(req: RequestWithUser, res: Response) {
        try {
            // masukkan acuan untuk database
            const threadId = Number(req.params.threadId);
            const userId = req.user.id;
            const checkLike = await prisma.likes.findUnique({
                where: { userId_threadId: { threadId, userId } }
            })

            if (checkLike) {
                await prisma.likes.delete({
                    where: { id: checkLike.id }
                })

                await prisma.thread.update({
                    where: { id: threadId },
                    data: { likesCount: { decrement: 1 } }
                })
                res.json({ message: "unliked" })
            } else {
                await prisma.likes.create({
                    data: { threadId, userId }
                })

                await prisma.thread.update({
                    where: { id: threadId },
                    data: { likesCount: { increment: 1 } }
                })
                res.json({ message: "liked" })
            }

        } catch (Error) {
            console.log(Error)
        }
    }

}

export default new LikeThreadController()