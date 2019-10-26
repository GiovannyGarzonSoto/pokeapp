import {Router} from 'express'
import {classesController} from '../controllers/classesController'

const router: Router = Router()

router.get('/', classesController.listAll)

router.get('/:id', classesController.list)

router.post('/', classesController.add)

export default router