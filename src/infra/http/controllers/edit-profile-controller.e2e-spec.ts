import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter

describe('Edit profile', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
  })

  afterAll(async () => {
    app.close()
  })

  it('[PATCH] /edit - should be able to edit profile.', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })

    const response = await request(app.server)
      .patch('/edit')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'Jane Doe',
      })

    expect(response.statusCode).toBe(200)
  })
})
