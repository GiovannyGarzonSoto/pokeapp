import {Router} from 'express'
import {authController} from '../controllers/authController'
//import {verifyToken} from '../middlewares/verifyToken'
//import passport from 'passport'

const router: Router = Router()

router.post('/signup', authController.signup)

router.post('/signin', authController.signin)

router.get('/', authController.profile)

export default router