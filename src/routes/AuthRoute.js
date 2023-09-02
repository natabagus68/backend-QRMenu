import express from 'express'
import VerifyToken from '../middlewares/VerifyToken'
import AuthController from '../controllers/AuthController'
const router = express.Router()

router.post('/login', AuthController.login.bind(AuthController))
router.get('me', VerifyToken.handle, AuthController.me.bind(AuthController))
export default router