import {Router} from 'express'
import {movesController} from '../controllers/movesController'
import { isAuthenticated, isAdmin } from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', movesController.listAll)

router.get('/:id', movesController.list)

router.post('/',[isAuthenticated, isAdmin],  movesController.add)

router.put('/:id', [isAuthenticated, isAdmin], movesController.update)

router.delete('/:id', [isAuthenticated, isAdmin], movesController.delete)

export default router