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

describe('Fetch organization by name', () => {
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

  it('[GET] /organization - should be able to fetch organization by name', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })

    const response = await request(app.server)
      .get('/organization')
      .query({ name: organization.name })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        organization: expect.objectContaining({
          name: organization.name,
        }),
      })
    )
  })
})
