import { makeRegisterSchedulingFactory } from '@/infra/factories/make-register-scheduling-factory'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerSchedulingBodySchema = z.object({
  date: z.string().transform((str, ctx) => {
    const date = new Date(str)

    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Invalid date string',
      })
    }

    return date
  }),
})

const registerSchedulingParamsSchema = z.object({
  organizationId: z.string(),
})

export class RegisterSchedulingController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { date } = registerSchedulingBodySchema.parse(request.body)
    const { organizationId } = registerSchedulingParamsSchema.parse(
      request.params
    )
    const { sub } = request.user as { sub: string }

    const registerSchedulingUseCase = makeRegisterSchedulingFactory()

    const result = await registerSchedulingUseCase.execute({
      clientId: sub,
      organizationId,
      date,
    })

    if (result.isLeft()) {
      return reply.status(404).send({ message: result.value.message })
    }

    return reply.status(200).send()
  }
}
