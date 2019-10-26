import {Router} from 'express'
import {movesController} from '../controllers/movesController'

const router: Router = Router()

router.get('/', movesController.listAll)

router.get('/:id', movesController.list)

router.post('/', movesController.add)

router.put('/:id', movesController.update)

router.delete('/:id', movesController.delete)

export default router