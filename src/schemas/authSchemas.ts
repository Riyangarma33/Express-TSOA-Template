import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export interface loginRequest {
  /**
   * @format email
   * @pattern ^(.+)@(.+)$ please provide correct email
   */
  email: string;
  /**
   * @format password
   */
  password: string;
}

export interface registerRequest {
  name: string;
  /**
   * @format email
   * @pattern ^(.+)@(.+)$ please provide correct email
   */
  email: string;
  /**
   * @format password
   */
  password: string;
}
