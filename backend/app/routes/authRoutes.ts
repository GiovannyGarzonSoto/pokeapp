import {Router} from 'express'
import {authController} from '../controllers/authController'
import {verifyToken} from '../middlewares/verifyToken'

const router: Router = Router()

router.post('/signup', authController.signup)

router.post('/signin', authController.signin)

router.get('/', verifyToken, authController.profile)

export default router