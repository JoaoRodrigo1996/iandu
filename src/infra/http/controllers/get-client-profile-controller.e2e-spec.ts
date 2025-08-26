import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter

describe('Get client profile', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should be able to get client profile', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.client).toEqual(
      expect.objectContaining({
        email: client.email,
      })
    )
  })
})
