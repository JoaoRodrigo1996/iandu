import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../controllers/authenticate-controller'
import { CreateAccountController } from '../controllers/create-account-controller'

const createAccountController = new CreateAccountController()
const authenticateController = new AuthenticateController()

export function accountRoutes(app: FastifyInstance) {
  app.post('/users', createAccountController.handle)
  app.post('/sessions', authenticateController.handle)
}
