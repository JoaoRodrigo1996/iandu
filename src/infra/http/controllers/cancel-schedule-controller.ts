import { NotAllowedError } from '@/core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeCancelScheduleFactory } from '@/infra/factories/make-cancel-schedule-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const cancelScheduleParamsSchema = z.object({
  id: z.string().uuid(),
})

export class CancelScheduleController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }
    const { id } = cancelScheduleParamsSchema.parse(request.params)

    const cancelScheduleUseCase = makeCancelScheduleFactory()

    const result = await cancelScheduleUseCase.execute({
      client_id: sub,
      scheduling_id: id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('Schedule not found')
        case NotAllowedError:
          throw new Error('You can not delete schedule from another client')
        default:
          throw new Error(error.message)
      }
    }

    return reply.status(204).send()
  }
}
