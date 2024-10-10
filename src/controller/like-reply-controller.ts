import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { RequestWithUser } from "../types/user";

const prisma = new PrismaClient();

class LikeReplyController {

    async getLikeReply(req: RequestWithUser, res: Response) {
        try {
            // buat variabel untuk menampung kebutuhan dari databasenya
            const replyId = Number(req.params.replyId);
            const userId = req.user.id;
            //cari reply nya beradasrkan id 
            const reply = await prisma.reply.findUnique({
                where: { id: replyId },
                include: {
                    thread: {
                        select: {
                            Likes: {
                                where: { userId: userId }
                            }
                        }
                    }
                }
            })
            // cek replynya ada atau engga
            if (!reply) {
                return console.error("reply not found")
            }
            const isLiked = reply.thread?.Likes && reply.thread.Likes.length > 0;
            const likesCount = reply.thread?.Likes ? reply.thread.Likes.length : 0;
            res.json({ isLiked, likesCount });


        } catch (error) {
            console.log(error)
        }

    }
    async likeReply(req: RequestWithUser, res: Response) {
        try {
            // masukkan acuan untuk database
            const replyId = Number(req.params.replyId);
            const userId = req.user.id;
            const checkLike = await prisma.likes.findUnique({
                where: { userId_replyId: { replyId, userId } }
            })
            if (checkLike) {
                await prisma.likes.delete({
                    where: { id: checkLike.id },
                })
                await prisma.reply.update({
                    where: { id: replyId },
                    data: { likesCount: { decrement: 1 } }
                })
                res.json({ message: "unliked" })
            } else {
                await prisma.likes.create({
                    data: { replyId, userId }
                })

                await prisma.reply.update({
                    where: { id: replyId },
                    data: { likesCount: { increment: 1 } }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default new LikeReplyController()