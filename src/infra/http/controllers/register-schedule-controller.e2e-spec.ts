import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'

let prisma: PrismaService
let jwtService: JwtEncrypter
let clientFactory: ClientFactory
let organizationFactory: OrganizationFactory

describe('Create schedule', () => {
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

  it('[POST] /schedule/:organizationId - should be able to create new schedule', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })

    const organizationId = organization.id.toString()

    const response = await request(app.server)
      .post(`/schedule/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        date: new Date('2025-09-09T13:00:00.000Z'),
      })

    expect(response.statusCode).toBe(201)
  })
})
