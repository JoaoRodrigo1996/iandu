import type { FastifyInstance } from 'fastify'
import { FetchClientScheduleHistoryController } from '../controllers/fetch-client-schedule-history-controller'
import { RegisterSchedulingController } from '../controllers/register-scheduling-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const registerScheduleController = new RegisterSchedulingController()
const fetchClientScheduleHistory = new FetchClientScheduleHistoryController()

export function scheduleRoutes(app: FastifyInstance) {
  app.post(
    '/schedule/:organizationId',
    { onRequest: [ensureAuthenticated] },
    registerScheduleController.handle
  )
  app.get(
    '/schedule/history',
    { onRequest: [ensureAuthenticated] },
    fetchClientScheduleHistory.handle
  )
}
