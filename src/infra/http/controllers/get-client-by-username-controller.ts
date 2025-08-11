import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeGetClientByUsernameFactory } from '@/infra/factories/make-get-client-by-username-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ClientPresenter } from '../presenters/client-presenter'

const getClientByusernameQuerySchema = z.object({
  username: z.string(),
})

export class GetClientByUsernameController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { username } = getClientByusernameQuerySchema.parse(request.query)

    const getClientByusernameUseCase = makeGetClientByUsernameFactory()

    const result = await getClientByusernameUseCase.execute({
      userName: username,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('Usuário não encontrado.')
        default:
          throw new Error('Erro ao buscar usuário.')
      }
    }

    return reply
      .status(200)
      .send({ client: ClientPresenter.toHTTP(result.value.client) })
  }
}
