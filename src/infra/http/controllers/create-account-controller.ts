import { makeCreateAccountFactory } from '@/infra/factories/make-create-account-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export class CreateAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, userName, email, password } = createAccountBodySchema.parse(
        request.body
      )

      const makeCreateAccountUseCase = makeCreateAccountFactory()

      await makeCreateAccountUseCase.execute({
        name,
        userName,
        email,
        password,
      })

      return reply.status(201).send()
    } catch (error) {
      if (error instanceof ZodError) {
        return reply
          .status(400)
          .send({ message: 'Validation error', issues: error.errors })
      }

      return reply.status(500).send({ message: 'Internal server error.' })
    }
  }
}
