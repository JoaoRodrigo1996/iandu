import type { FastifyInstance } from 'fastify'
import { CreateOrganizationController } from '../controllers/create-organization-controller'
import { RegisterMemberController } from '../controllers/register-member-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const registerMemberController = new RegisterMemberController()

export function memberRoutes(app: FastifyInstance) {
  app.post(
    '/member/:organizationId',
    { onRequest: [ensureAuthenticated] },
    registerMemberController.handle
  )
}
