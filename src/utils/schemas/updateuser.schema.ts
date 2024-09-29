import Joi from "joi";
import { UpdateUserDTO } from "../../dto/user.dto";

export const updateUserSchema = Joi.object<UpdateUserDTO>({
    fullName:Joi.string().min(3).max(100),
    username:Joi.string().min(3).max(100),
    biografi:Joi.string().min(3).max(100),
})