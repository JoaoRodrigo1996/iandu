import type { FastifyInstance } from 'fastify'
import { AvailableController } from '../controllers/available-controller'
import { CreateOrganizationController } from '../controllers/create-organization-controller'
import { FetchOrganizationByNameController } from '../controllers/fetch-organization-by-name-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const availablesController = new AvailableController()

export function availableRoutes(app: FastifyInstance) {
  app.post(
    '/available/:organizationId',
    { onRequest: [ensureAuthenticated] },
    availablesController.handle
  )
}
