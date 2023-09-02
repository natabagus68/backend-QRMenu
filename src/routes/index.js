import { Router } from "express";
import AuthRouter from './AuthRoute'
import UserRouter from './UserRoute'
const routes = Router();

routes.use('/auth', AuthRouter)
routes.use('/user', UserRouter)

export default routes;