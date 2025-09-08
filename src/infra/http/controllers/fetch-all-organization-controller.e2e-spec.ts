import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { OrganizationFactory } from 'test/factories/make-organization'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter
let organizationFactory: OrganizationFactory

describe('Fetch organization', () => {
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

  it('[GET] /organization - should be able to fetch all organization', async () => {
    const owner1 = await clientFactory.makePrismaClient()
    const owner2 = await clientFactory.makePrismaClient()
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })

    await Promise.all([
      organizationFactory.makePrismaOrganization({
        clientId: owner1.id,
        name: 'Organization 01',
      }),
      organizationFactory.makePrismaOrganization({
        clientId: owner2.id,
        name: 'Organization 02',
      }),
    ])

    const response = await request(app.server)
      .get('/organizations')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
