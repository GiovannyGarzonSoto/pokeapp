import {Router} from 'express'
import {abilitiesController} from '../controllers/abilitiesController'

const router: Router = Router()

router.get('/', abilitiesController.listAll)

router.get('/:id', abilitiesController.list)

router.post('/', abilitiesController.add)

router.put('/:id', abilitiesController.update)

router.delete('/:id', abilitiesController.delete)

export default router