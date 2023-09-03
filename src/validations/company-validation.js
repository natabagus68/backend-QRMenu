import { body } from "express-validator"

export const compayCreateValidation = [
    body('name').notEmpty().withMessage('name is require'),
    body('address').notEmpty().withMessage('address is require'),
    body('image').isObject().withMessage('image must be an object or file')
]