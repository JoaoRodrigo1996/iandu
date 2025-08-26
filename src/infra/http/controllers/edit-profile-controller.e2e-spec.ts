import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'

let prisma: PrismaService

describe('Edit profile', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
  })

  afterAll(async () => {
    app.close()
  })

  it('[PATCH] /edit - should be able to edit profile.', async () => {
    const client = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      userName: faker.internet.username(),
    }

    await request(app.server).post('/users').send({
      name: client.name,
      email: client.email,
      userName: client.userName,
      password: '12345678',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: client.email,
      password: '12345678',
    })

    const { access_token } = await authResponse.body

    const response = await request(app.server)
      .patch('/edit')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'Jane Doe',
      })

    expect(response.statusCode).toBe(200)
  })
})
