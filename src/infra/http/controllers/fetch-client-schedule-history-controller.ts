import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeFetchClientScheduleHistoryFactory } from '@/infra/factories/make-fetch-client-schedule-history-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { SchedulePresenter } from '../presenters/schedule-presenter'

export class FetchClientScheduleHistoryController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string }

    const fetchClientScheduleHistoryUseCase =
      makeFetchClientScheduleHistoryFactory()

    const result = await fetchClientScheduleHistoryUseCase.execute({
      clientId: sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('scheduling history not found.')
        default:
          throw new Error('Error fetching scheduling history.')
      }
    }

    return reply
      .status(200)
      .send({ history: result.value.history.map(SchedulePresenter.toHTTP) })
  }
}
