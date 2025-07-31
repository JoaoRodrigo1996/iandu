import type { FastifyInstance } from 'fastify'
import { CreateOrganizationController } from '../controllers/create-organization-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createOrganizationController = new CreateOrganizationController()

export function organizationRoutes(app: FastifyInstance) {
  app.post(
    '/organization',
    { onRequest: [ensureAuthenticated] },
    createOrganizationController.handle
  )
}
