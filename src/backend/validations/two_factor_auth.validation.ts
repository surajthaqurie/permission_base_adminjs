import Joi from "joi";

export const twoFAValidation = (data: { userId: string }): any => {
  const schema = Joi.object<{ userId: string }, true>({
    userId: Joi.string().required().trim()
  });
  return schema.validate(data);
};

export const twoFAVerifyValidation = (data: { userId: string; twoFAToken: string }): any => {
  const schema = Joi.object<{ userId: string; twoFAToken: string }, true>({
    userId: Joi.string().required().trim(),
    twoFAToken: Joi.string().required().trim()
  });
  return schema.validate(data);
};
