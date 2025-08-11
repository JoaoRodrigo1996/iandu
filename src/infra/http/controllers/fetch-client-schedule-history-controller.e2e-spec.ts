import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'

let prisma: PrismaService

describe('Fetch client schedule history', () => {
  beforeAll(async () => {
    app.ready()
    prisma = new PrismaService()
  })

  afterAll(async () => {
    app.close()
  })

  it('[GET] /schedule/history - should be able to fetch client schedule history', async () => {
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

    const organization = await request(app.server)
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

    const organizationId = organization.body.organization.id.value

    await request(app.server)
      .post(`/schedule/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        date: new Date('2022-01-01T13:00:00.000Z'),
      })

    const response = await request(app.server)
      .get('/schedule/history')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
