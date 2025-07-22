import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../controllers/authenticate-controller'
import { CreateAccountController } from '../controllers/create-account-controller'
import { GetClientProfileController } from '../controllers/get-client-profile-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createAccountController = new CreateAccountController()
const authenticateController = new AuthenticateController()
const getClientProfileController = new GetClientProfileController()

export function accountRoutes(app: FastifyInstance) {
  app.post('/users', createAccountController.handle)
  app.post('/sessions', authenticateController.handle)

  app.get('/me', {onRequest: [ensureAuthenticated]}, getClientProfileController.handle)
}
