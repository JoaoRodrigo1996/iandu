import { OrganizationAlreadyExistsError } from '@/domain/scheduling/application/use-cases/errors/organization-already-exists-error'
import { makeOrganizationFactory } from '@/infra/factories/make-organization-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createOrganizationBodySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  email: z.string().email(),
  phone: z.string(),
  description: z.string(),
  sector: z.string(),
})

export class CreateOrganizationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }
    const { address, cnpj, description, email, name, phone, sector } =
      createOrganizationBodySchema.parse(request.body)

    const createOrganizationUseCase = makeOrganizationFactory()

    const result = await createOrganizationUseCase.execute({
      ownerId: sub,
      address,
      cnpj,
      description,
      email,
      name,
      phone,
      sector,
    })

    if (result.isLeft()) {
      return reply.status(400).send({ message: result.value.message })
    }

    return reply.status(200).send()
  }
}
