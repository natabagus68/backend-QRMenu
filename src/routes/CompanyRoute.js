import { Router } from 'express'
import { FileSystem } from '../middlewares/FileSystem'
import { compayCreateValidation } from '../validations/company-validation'
import VerifyToken from '../middlewares/VerifyToken'
import CompanyController from '../controllers/CompanyController'
const router = Router()

router.post('/', VerifyToken.handle, compayCreateValidation, FileSystem.upload('company').single('image'), CompanyController.create.bind(CompanyController))

export default router