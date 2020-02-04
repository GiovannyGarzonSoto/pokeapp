import {Router} from 'express'
import {groupsController} from '../controllers/groupsController'
import { isAuthenticated, isAdmin } from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', groupsController.listAll)

router.get('/:id', groupsController.list)

router.post('/', [isAuthenticated, isAdmin], groupsController.add)

export default router 