import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error'
import { makeEditAvailableFactory } from '@/infra/factories/make-edit-available-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AvailablePresenter } from '../presenters/available-presenter'

const editAvailableBodySchema = z.object({
  weekDay: z.number(),
  startTimeInMinutes: z.number(),
  endTimeInMinutes: z.number(),
})

const editAvailableParamsSchema = z.object({
  organizationId: z.string().uuid(),
})

export class EditAvailableController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { weekDay, startTimeInMinutes, endTimeInMinutes } =
      editAvailableBodySchema.parse(request.body)
    const { organizationId } = editAvailableParamsSchema.parse(request.params)

    const editAvailableUseCase = makeEditAvailableFactory()

    const result = await editAvailableUseCase.execute({
      organizationId,
      weekDay,
      startTimeInMinutes,
      endTimeInMinutes,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new Error('Available not found.')
        default:
          throw new Error(error.message)
      }
    }

    return reply.status(200).send({
      available: AvailablePresenter.toHTTP(result.value.organizationAvailable),
    })
  }
}
