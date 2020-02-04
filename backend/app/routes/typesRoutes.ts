import {Router} from 'express'
import {typesController} from '../controllers/typesController'
import { isAuthenticated, isAdmin } from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', typesController.listAll)

router.get('/:id', typesController.list)

router.post('/', [isAuthenticated, isAdmin], typesController.add)

export default router