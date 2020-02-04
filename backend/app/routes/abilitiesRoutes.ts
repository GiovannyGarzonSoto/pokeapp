import {Router} from 'express'
import {abilitiesController} from '../controllers/abilitiesController'
import { isAuthenticated, isAdmin} from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', abilitiesController.listAll)

router.get('/:id', abilitiesController.list)

router.post('/', [isAuthenticated, isAdmin], abilitiesController.add)

router.put('/:id', [isAuthenticated, isAdmin], abilitiesController.update)

router.delete('/:id', [isAuthenticated, isAdmin], abilitiesController.delete)

export default router