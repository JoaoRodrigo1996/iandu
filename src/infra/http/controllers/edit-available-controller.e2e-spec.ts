import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { AvailableFactory } from 'test/factories/make-available'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'

let prisma: PrismaService
let clientFactory: ClientFactory
let organizationFactory: OrganizationFactory
let availableFactory: AvailableFactory
let jwtService: JwtEncrypter

describe('Edit available', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
    organizationFactory = new OrganizationFactory(prisma)
    availableFactory = new AvailableFactory(prisma)
  })

  afterAll(async () => {
    app.close()
  })

  it('[PATCH] /edit - should be able to edit available.', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })
    await availableFactory.makePrismaAvailable({
      organization_id: organization.id,
    })

    const organizationId = organization.id.toString()

    const response = await request(app.server)
      .patch(`/available/edit/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        weekDay: 5,
        startTimeInMinutes: 420,
        endTimeInMinutes: 820,
      })

    expect(response.statusCode).toBe(200)
  })
})
