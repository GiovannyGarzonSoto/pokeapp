import {Router} from 'express'
import {classesController} from '../controllers/classesController'
import { isAuthenticated, isAdmin } from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', classesController.listAll)

router.get('/:id', classesController.list)

router.post('/', [isAuthenticated, isAdmin], classesController.add)

export default router