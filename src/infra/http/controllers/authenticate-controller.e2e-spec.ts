import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'

let prisma: PrismaService
let clientFactory: ClientFactory

describe('Authenticate account (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    clientFactory = new ClientFactory(prisma)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /sessions - should authenticate an account', async () => {
    const client = await clientFactory.makePrismaClient({
      email: 'johndoe@example.com',
      password: await hash('12345678', 6),
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
