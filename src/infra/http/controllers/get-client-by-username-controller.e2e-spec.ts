import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter

describe('Get client by username', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should be able to get client by username', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })

    const response = await request(app.server)
      .get('/client')
      .query({ username: client.userName })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
