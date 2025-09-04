import { initializeTracing } from './tracing'
await initializeTracing()

import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { accountRoutes } from './http/routes/account'
import { availableRoutes } from './http/routes/available'
import { memberRoutes } from './http/routes/member'
import { organizationRoutes } from './http/routes/organization'
import { scheduleRoutes } from './http/routes/schedule'

export const app = fastify()

app.register(jwt, {
  secret: 'sercret_Key_test',
})

app.register(accountRoutes)
app.register(scheduleRoutes)
app.register(organizationRoutes)
app.register(memberRoutes)
app.register(availableRoutes)

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
