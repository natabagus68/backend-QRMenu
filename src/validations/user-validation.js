import { body } from "express-validator"
export const validateUpdaeUser = [
    body('name').notEmpty().withMessage('name is reuire'),
    body('email').notEmpty().withMessage('email is require').isEmail().withMessage('format email is wrong')
]
export const validateCreateUser = [
    body('name').notEmpty().withMessage('name is reuire'),
    body('email').notEmpty().withMessage('email is require').isEmail().withMessage('format email is wrong')
]