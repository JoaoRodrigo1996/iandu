import type { FastifyInstance } from 'fastify'
import { CreateAccountController } from '../controllers/create-account-controller'

const createAccountController = new CreateAccountController()

export function accountRoutes(app: FastifyInstance) {
  app.post('/users', createAccountController.handle)
}
