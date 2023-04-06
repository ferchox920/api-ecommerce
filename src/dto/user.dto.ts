import Joi from 'joi';
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string | null;
  }
  

  export const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
    avatar: Joi.string().allow(null)
  })