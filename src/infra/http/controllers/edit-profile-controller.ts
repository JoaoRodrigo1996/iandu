import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeEditProfileFactory } from '@/infra/factories/make-edit-profile-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const editProfileBodySchema = z.object({
  name: z.string(),
})

export class EditProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }
    const { name } = editProfileBodySchema.parse(request.body)

    const editProfileUseCase = makeEditProfileFactory()

    const result = await editProfileUseCase.execute({
      client_id: sub,
      name,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('User not found')
        case NotAllowedError:
          throw new Error('You are not allowed to edit this profile')
        default:
          throw new Error('Failed to edit profile')
      }
    }

    return reply.status(200).send()
  }
}
