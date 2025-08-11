import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'

let prisma: PrismaService

describe('Fetch organization by name', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
  })

  afterAll(async () => {
    app.close()
  })

  it('[GET] /organization - should be able to fetch organization by name', async () => {
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

    await request(app.server)
      .post('/organization')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'Amazon',
        address: {
          city: 'Miami',
          complement: 'Apt 123',
          neighborhood: 'Downtown',
          number: 123,
          state: 'FL',
          street: 'Main St',
          zip: '12345',
        },
        email: faker.internet.email(),
        cnpj: `${faker.string.numeric(14)}`,
        description: 'A organization description',
        sector: 'Services',
        phone: '(99) 99999-9999',
      })

    const response = await request(app.server)
      .get('/organization')
      .query({ name: 'Amazon' })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    console.log(response.body)
    console.log(response.statusCode)
  })
})
