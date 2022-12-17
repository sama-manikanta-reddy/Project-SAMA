import Joi from "joi-plus";

const userSchema = Joi.object({
    username: Joi.string()
        .min(8)
        .max(20)
        .alpha()
        .required(),
    name: Joi.string()
        .min(2)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .numeric()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
});

const mailSchema = Joi.object({
    mailData: Joi.string()
        .required()
        .min(10)
        .max(300),
    to: Joi.string()
        .required()
})

export { userSchema, mailSchema };