import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { MemberAlreadyRegisteredError } from '@/domain/scheduling/application/use-cases/errors/member-already-registered'
import { makeRegisterMemberfactory } from '@/infra/factories/make-register-member-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MemberPresenter } from '../presenters/member-presenter'

const registerMemberBodySchema = z.object({
  role: z.enum(['ADMIN', 'EMPLOYEE', 'MEMBER']),
})

const registerMemberParamsSchema = z.object({
  organizationId: z.string().uuid(),
})

export class RegisterMemberController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }
    const { role } = registerMemberBodySchema.parse(request.body)
    const { organizationId } = registerMemberParamsSchema.parse(request.params)

    const registerMemberUseCase = makeRegisterMemberfactory()

    const result = await registerMemberUseCase.execute({
      clientId: sub,
      organizationId,
      role,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return reply.status(404).send({ message: 'Organization not found.' })
        case MemberAlreadyRegisteredError:
          return reply
            .status(409)
            .send({ message: 'Member already registered.' })
        default:
          return reply.status(500).send()
      }
    }

    return reply
      .status(201)
      .send({ member: MemberPresenter.toHTTP(result.value.member) })
  }
}
