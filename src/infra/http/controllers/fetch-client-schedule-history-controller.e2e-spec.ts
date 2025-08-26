import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'
import { ScheduleFactory } from 'test/factories/make-scheduling'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter
let organizationFactory: OrganizationFactory
let scheduleFactory: ScheduleFactory

describe('Fetch client schedule history', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
    organizationFactory = new OrganizationFactory(prisma)
    scheduleFactory = new ScheduleFactory(prisma)
  })

  afterAll(async () => {
    app.close()
  })

  it('[GET] /schedule/history - should be able to fetch client schedule history', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })
    await scheduleFactory.makePrismaSchedule({
      clientId: client.id,
      organizationId: organization.id,
    })

    const response = await request(app.server)
      .get('/schedule/history')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
