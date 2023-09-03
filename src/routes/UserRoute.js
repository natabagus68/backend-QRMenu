import express from 'express'
import VerifyToken from '../middlewares/VerifyToken'
import UserController from '../controllers/UserController'
import { validateUpdaeUser } from '../validations/user-validation'
import { FileSystem } from '../middlewares/FileSystem'
const router = express.Router()

router.post('/', FileSystem.upload('user', 'image'), UserController.createUser.bind(UserController))
router.put('/:id', VerifyToken.handle, FileSystem.upload('user', 'image'), UserController.updateUser.bind(UserController))

export default router