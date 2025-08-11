import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeFetchOrganizationByNameFactory } from '@/infra/factories/make-fetch-organization-by-name-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrganizationPresenter } from '../presenters/organization-presenter'

const fetchOrganizationByNameQuerySchema = z.object({
  name: z.string(),
})

export class FetchOrganizationByNameController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name } = fetchOrganizationByNameQuerySchema.parse(request.query)

    console.log('CONTROLLER ', name)

    const organizationUseCase = makeFetchOrganizationByNameFactory()

    const result = await organizationUseCase.execute({ name })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('Organization not found with this name.')
        default:
          throw new Error(error.message)
      }
    }

    return reply.status(200).send({
      organization: OrganizationPresenter.toHTTP(result.value.organization),
    })
  }
}
