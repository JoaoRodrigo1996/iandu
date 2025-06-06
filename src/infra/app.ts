import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { accountRoutes } from './http/routes/account'

export const app = fastify()

app.register(accountRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //  Here we should log to an external tool like dataDog e.t.c
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
