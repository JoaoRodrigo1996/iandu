import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { PrismaInstrumentation } from '@prisma/instrumentation'

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)
const sdk = new NodeSDK({
  serviceName: 'iandu-api',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4317',
  }),
  instrumentations: [new HttpInstrumentation(), new PrismaInstrumentation()],
})

process.on('beforeExit', async () => {
  await sdk.shutdown()
})

export const initializeTracing = async () => {
  return sdk.start()
}
