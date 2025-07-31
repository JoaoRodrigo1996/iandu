import { makeGetClientProfileFactory } from '@/infra/factories/make-get-client-profile-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class GetClientProfileController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }

    const getClientProfileUseCase = makeGetClientProfileFactory()

    const result = await getClientProfileUseCase.execute({ clientId: sub })

    if (result.isLeft()) {
      return reply.status(404).send({
        message: 'Client not found',
      })
    }

    const client = result.value.client

    return reply.status(200).send({
      client: {
        id: client.id,
        email: client.email,
        name: client.name,
        userName: client.userName,
        password: undefined,
      },
    })
  }
}
