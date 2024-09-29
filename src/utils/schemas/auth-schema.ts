import Joi from 'joi'
import { CreateUserDTO } from '../../dto/user.dto'
import { registerDTO, loginDTO } from '../../dto/auth.dto'

export const loginSchema = Joi.object<loginDTO>({
    email: Joi.string().email(),
    password: Joi.string(),  
})
export const registerSchema = Joi.object<registerDTO>({
    fullName: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    password:Joi.string().min(6),
    

})