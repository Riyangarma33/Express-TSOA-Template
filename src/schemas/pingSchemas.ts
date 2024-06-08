import Joi from "joi";

export const pingSchema = Joi.object({
  name: Joi.string(),
});
