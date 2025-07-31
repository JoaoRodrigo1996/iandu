import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'

let prisma: PrismaService
let jwtService: JwtEncrypter

describe('Get client profile', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should be able to get client profile', async () => {
    await prisma.client.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        userName: 'johndoe',
        password: await hash('12345678', 8),
      },
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const { access_token } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.client).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      })
    )
  })
})
