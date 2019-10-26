import {Router} from 'express'
import {groupsController} from '../controllers/groupsController'

const router: Router = Router()

router.get('/', groupsController.listAll)

router.get('/:id', groupsController.list)

router.post('/', groupsController.add)

export default router 