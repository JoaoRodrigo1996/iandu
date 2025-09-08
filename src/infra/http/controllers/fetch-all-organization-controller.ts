import { makeFetchAllOrganizationFactory } from '@/infra/factories/make-fetch-all-organizations-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrganizationPresenter } from '../presenters/organization-presenter'

const pageQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

export class FetchAllOrganizationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page } = pageQueryParamsSchema.parse(request.query)

    const fetchAllOrganization = makeFetchAllOrganizationFactory()

    const result = await fetchAllOrganization.execute({ page })

    const organizations = result.value?.organizations

    return reply
      .status(200)
      .send({ organization: organizations?.map(OrganizationPresenter.toHTTP) })
  }
}
