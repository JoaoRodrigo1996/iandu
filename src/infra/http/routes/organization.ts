import type { FastifyInstance } from 'fastify'
import { CreateOrganizationController } from '../controllers/create-organization-controller'
import { FetchAllOrganizationController } from '../controllers/fetch-all-organization-controller'
import { FetchOrganizationByNameController } from '../controllers/fetch-organization-by-name-controller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const createOrganizationController = new CreateOrganizationController()
const fetchOrganizationByNameController =
  new FetchOrganizationByNameController()

const fetchAllOrganizationController = new FetchAllOrganizationController()

export function organizationRoutes(app: FastifyInstance) {
  app.post(
    '/organization',
    { onRequest: [ensureAuthenticated] },
    createOrganizationController.handle
  )

  app.get(
    '/organization',
    { onRequest: [ensureAuthenticated] },
    fetchOrganizationByNameController.handle
  )

  app.get(
    '/organizations',
    { onRequest: [ensureAuthenticated] },
    fetchAllOrganizationController.handle
  )
}
