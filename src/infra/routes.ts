import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express-route.adapter'
import { makeSaveLeadControllerFactory } from './factories/controllers/save-lead-controller.factory'

const router = Router()

router.post('/leads', expressRouteAdapter(makeSaveLeadControllerFactory()))

export { router }
