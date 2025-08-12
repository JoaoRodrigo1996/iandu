import type { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../controllers/authenticate-controller'
import { CreateAccountController } from '../controllers/create-account-controller'
import { EditProfileController } from '../controllers/edit-profile-controller'
import { GetClientByUsernameController } from '../controllers/get-client-by-username-controller'
import { GetClientProfileController } from '../controllers/get-client-profile-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createAccountController = new CreateAccountController()
const authenticateController = new AuthenticateController()
const getClientProfileController = new GetClientProfileController()
const getClientByusernameController = new GetClientByUsernameController()
const editProfileController = new EditProfileController()

export function accountRoutes(app: FastifyInstance) {
  app.post('/users', createAccountController.handle)
  app.post('/sessions', authenticateController.handle)

  app.get(
    '/me',
    { onRequest: [ensureAuthenticated] },
    getClientProfileController.handle
  )
  app.get(
    '/client',
    { onRequest: [ensureAuthenticated] },
    getClientByusernameController.handle
  )

  app.patch(
    '/edit',
    { onRequest: [ensureAuthenticated] },
    editProfileController.handle
  )
}
