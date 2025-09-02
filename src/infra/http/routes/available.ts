import type { FastifyInstance } from 'fastify'
import { AvailableController } from '../controllers/available-controller'
import { EditAvailableController } from '../controllers/edit-available-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const availablesController = new AvailableController()
const editAvailablesController = new EditAvailableController()

export function availableRoutes(app: FastifyInstance) {
  app.post(
    '/available/:organizationId',
    { onRequest: [ensureAuthenticated] },
    availablesController.handle
  )

  app.patch(
    '/available/edit/:organizationId',
    { onRequest: [ensureAuthenticated] },
    editAvailablesController.handle
  )
}
