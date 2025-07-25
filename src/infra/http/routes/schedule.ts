import type { FastifyInstance } from 'fastify'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { RegisterSchedulingController } from '../controllers/register-scheduling-controller'

const registerScheduleController = new RegisterSchedulingController()

export function scheduleRoutes(app: FastifyInstance) {
  app.post('/schedule/:organizationId', { onRequest: [ensureAuthenticated] }, registerScheduleController.handle)
}
