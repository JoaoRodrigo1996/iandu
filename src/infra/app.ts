import { initializeTracing } from './tracing'
await initializeTracing()

import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { initializeCPUProfiling } from './cpu-profiling'
import { env } from './env'
import { accountRoutes } from './http/routes/account'
import { availableRoutes } from './http/routes/available'
import { memberRoutes } from './http/routes/member'
import { organizationRoutes } from './http/routes/organization'
import { scheduleRoutes } from './http/routes/schedule'

export const app = fastify({ logger: true })
const { start, stop } = initializeCPUProfiling()

app.register(jwt, {
  secret: 'sercret_Key_test',
})

app.register(accountRoutes)
app.register(scheduleRoutes)
app.register(organizationRoutes)
app.register(memberRoutes)
app.register(availableRoutes)

// start CPU profiling when not in production

// if (env.NODE_ENV !== 'production') {
//   start()

//   const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
//   for (const signal of exitSignals) {
//     process.on(signal, async () => {
//       await stop()
//       process.exit(0)
//     })
//   }
// }

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

start()

const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
for (const signal of exitSignals) {
  process.on(signal, async () => {
    await stop()
    process.exit(0)
  })
}
