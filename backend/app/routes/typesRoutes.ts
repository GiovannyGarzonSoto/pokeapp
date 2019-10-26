import {Router} from 'express'
import {typesController} from '../controllers/typesController'

const router: Router = Router()

router.get('/', typesController.listAll)

router.get('/:id', typesController.list)

router.post('/', typesController.add)

export default router