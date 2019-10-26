import {Router} from 'express'
import {pokemonController} from '../controllers/pokemonController'

const router: Router = Router()

router.get('/', pokemonController.listAll)

router.get('/:id', pokemonController.list)

router.post('/', pokemonController.add)

router.put('/:id', pokemonController.update)

router.delete('/:id', pokemonController.delete)

export default router