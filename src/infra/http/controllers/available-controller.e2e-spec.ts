import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'

let prisma: PrismaService
let jwtService: JwtEncrypter
let clientFactory: ClientFactory
let organizationFactory: OrganizationFactory

describe('Available times', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
    organizationFactory = new OrganizationFactory(prisma)
  })

  afterAll(async () => {
    app.close()
  })

  it('[POST] /available/:organizationId - should be able to create new available time', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })

    const organizationId = organization.id.toString()

    const response = await request(app.server)
      .post(`/available/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        intervals: [
          {
            weekDay: 1,
            startTimeInMinutes: 480,
            endTimeInMinutes: 1020,
          },
          {
            weekDay: 3,
            startTimeInMinutes: 480,
            endTimeInMinutes: 1020,
          },
          {
            weekDay: 5,
            startTimeInMinutes: 480,
            endTimeInMinutes: 1020,
          },
        ],
      })

    expect(response.statusCode).toBe(201)
  })
})
