import {Router} from 'express'
import {pokemonController} from '../controllers/pokemonController'
import { isAuthenticated, isAdmin } from '../middlewares/authenticated'

const router: Router = Router()

router.get('/', pokemonController.listAll)

router.get('/:id', pokemonController.list)

router.post('/', [isAuthenticated, isAdmin], pokemonController.add)

router.put('/:id', [isAuthenticated, isAdmin], pokemonController.update)

router.delete('/:id', [isAuthenticated, isAdmin], pokemonController.delete)

export default router