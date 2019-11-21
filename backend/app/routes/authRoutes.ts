import {Router} from 'express'
import {authController} from '../controllers/authController'
import passport from 'passport'

//passport config
require('../passport/passport')

const router: Router = Router()

router.post('/signup', authController.signup)

router.post('/signin', authController.signin)

router.get('/selector', passport.authenticate('jwt', {session: false}), authController.profile)

export default router