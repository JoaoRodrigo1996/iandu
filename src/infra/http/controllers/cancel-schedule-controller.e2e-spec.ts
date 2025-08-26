import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'
import { ScheduleFactory } from 'test/factories/make-scheduling'

let prisma: PrismaService
let jwtService: JwtEncrypter
let scheduleFactory: ScheduleFactory
let clientFactory: ClientFactory
let organizationFactory: OrganizationFactory

describe('Cancel schedule', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    scheduleFactory = new ScheduleFactory(prisma)
    clientFactory = new ClientFactory(prisma)
    organizationFactory = new OrganizationFactory(prisma)
  })

  afterAll(async () => {
    app.close()
  })

  it('[DELETE] /cancel/:scheduleId - should be able to cancel a schedule', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })
    const schedule = await scheduleFactory.makePrismaSchedule({
      clientId: client.id,
      organizationId: organization.id,
    })

    const id = schedule.id.toString()

    const response = await request(app.server)
      .delete(`/schedule/${id}`)
      .set('Authorization', `Bearer ${access_token}`)

    expect(response.statusCode).toBe(204)
  })
})
