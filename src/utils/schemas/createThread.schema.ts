import Joi from 'joi';
import { CreateThreadDTO } from '../../dto/thread.dto';

export const createThreadSchema = Joi.object<CreateThreadDTO>({
    title: Joi.string(),
    content: Joi.string(),
    image:Joi.string(),
})