import type { RegisterClient } from '@/domain/scheduling/application/use-cases/register-client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export class CreateAccountController {
  constructor(private createAccountUseCase: RegisterClient) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, userName, email, password } = createAccountBodySchema.parse(
      request.body
    )

    const makeCreateAccountUseCase = await this.createAccountUseCase.execute({
      name,
      userName,
      email,
      password,
    })

    if (makeCreateAccountUseCase.isLeft()) {
      return reply
        .status(400)
        .send({ message: makeCreateAccountUseCase.value.message })
    }

    return reply.status(201).send({
      message: 'Account created successfully',
    })
  }
}
