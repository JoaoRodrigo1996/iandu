import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { hash } from 'bcrypt'
import request from 'supertest'

let prisma: PrismaService

describe('Get client by username', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should be able to get client by username', async () => {
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
      .get('/client')
      .query({ username: 'johndoe' })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    console.log(response.body)
    console.log(response.statusCode)
  })
})
