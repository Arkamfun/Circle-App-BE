import Joi from 'joi';
import { ReplyDTO } from '../../dto/reply.dto';

export const createReplySchema = Joi.object<ReplyDTO>({
    authorId:Joi.number().integer(),
    threadId:Joi.number().integer(),
    content: Joi.string(),
    image:Joi.string(),
})