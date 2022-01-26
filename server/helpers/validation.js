import Joi from 'joi';

export const userValidate = (data) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(32).required(),
    lastName: Joi.string().min(2).max(32).required(),
    email: Joi.string().pattern(new RegExp('gmail.com')).required(),
    password: Joi.string().min(4).max(32).required(),
    confirmPassword: Joi.ref('password'),
  });

  return userSchema.validate(data);
};

export const updateInfoValidate = (data) => {
  const infoSchema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
  });

  return infoSchema.validate(data);
};

export const postValidate = (data) => {
  const postSchema = Joi.object({
    title: Joi.string()
      .required()
      .custom((value, helpers) => {
        const invalid = value.split(' ').filter((x) => x.length >= 2).length < 2;
        if (invalid) return helpers.error('any.invalid');

        return value;
      }),
    content: Joi.string().required().min(4),
    description: Joi.string()
      .required()
      .custom((value, helpers) => {
        const invalid = value.split(' ').filter((x) => x.length >= 2).length < 2;
        if (invalid) return helpers.error('any.invalid');

        return value;
      }),
    tags: Joi.string()
      .required()
      .custom((value, helpers) => {
        const invalid = value.split(' ').some((x) => x.length < 2);
        if (invalid) return helpers.error('any.invalid');

        return value;
      }),
  });

  return postSchema.validate(data);
};
