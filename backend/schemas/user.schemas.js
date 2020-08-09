const Joi = require('joi');

const registrationUserSchema = {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}
const loginUserSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}

module.exports = {
    registrationUserSchema : registrationUserSchema,
    loginUserSchema : loginUserSchema

}