import { makeAvailableFactory } from '@/infra/factories/make-available-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const availableBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
})

const availableParamsSchema = z.object({
  organizationId: z.string().uuid(),
})

export class AvailableController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { intervals } = availableBodySchema.parse(request.body)
    const { organizationId } = availableParamsSchema.parse(request.params)

    const availableUseCase = makeAvailableFactory()

    await Promise.all(
      intervals.map(interval =>
        availableUseCase.execute({
          organization_id: organizationId,
          week_day: interval.weekDay,
          start_time_in_minutes: interval.startTimeInMinutes,
          end_time_in_minutes: interval.endTimeInMinutes,
        })
      )
    )

    return reply.status(201).send()
  }
}
