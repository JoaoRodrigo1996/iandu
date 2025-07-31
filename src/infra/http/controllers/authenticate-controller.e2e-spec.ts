import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'

let prisma: PrismaService

describe('Authenticate account (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /sessions - should authenticate an account', async () => {
    await prisma.client.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        userName: 'johndoe',
        password: await hash('12345678', 8),
      },
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
