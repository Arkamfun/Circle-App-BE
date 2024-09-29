import Joi from "joi";
import { createPostDTO } from "../../dto/post.dto";
import { connect } from "http2";

export const postSchema = Joi.object<createPostDTO>({
    authorId:Joi.number().integer(),
    content:Joi.string().min(5),
    image:Joi.string(),
})