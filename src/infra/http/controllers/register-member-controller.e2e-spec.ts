import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'
import { MemberFactory } from 'test/factories/make-member'
import { OrganizationFactory } from 'test/factories/make-organization'

let prisma: PrismaService
let jwtService: JwtEncrypter
let clientFactory: ClientFactory
let organizationFactory: OrganizationFactory

describe('Create member', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
    organizationFactory = new OrganizationFactory(prisma)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /member/:organizationId - should be able to create a new member', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })
    const organization = await organizationFactory.makePrismaOrganization({
      clientId: client.id,
    })

    const organizationId = organization.id.toString()

    const response = await request(app.server)
      .post(`/member/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        role: 'MEMBER',
      })

    expect(response.statusCode).toBe(201)
  })
})
