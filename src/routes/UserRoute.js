import express from 'express'
import VerifyToken from '../middlewares/VerifyToken'
import UserController from '../controllers/UserController'
import { validateUpdaeUser } from '../validations/user-validation'
import { FileSystem } from '../middlewares/FileSystem'
const router = express.Router()

router.post('/', VerifyToken.handle, FileSystem.validate, FileSystem.upload('user').single('image'), UserController.createUser.bind(UserController))
router.put('/:id', VerifyToken.handle, FileSystem.validate, validateUpdaeUser, UserController.updateUser.bind(UserController))

export default router