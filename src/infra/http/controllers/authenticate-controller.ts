import { WrongCredentialsError } from '@/domain/scheduling/application/use-cases/errors/wrong-credentials-error'
import { makeAuthenticateFactory } from '@/infra/factories/make-authenticate-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export class AuthenticateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateFactory(reply.server)

    const result = await authenticateUseCase.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new Error('Email or password is incorrect.')
        default:
          throw new Error(error.message)
      }
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
