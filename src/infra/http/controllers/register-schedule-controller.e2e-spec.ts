import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import { hash } from 'bcrypt'
import request from 'supertest'

let prismaService: PrismaService

describe('Create schedule', () => {
  beforeAll(async () => {
    app.ready()
    prismaService = new PrismaService()
  })

  afterAll(async () => {
    app.close()
  })

  it('[POST] /schedule/:organizationId - should be able to create new schedule', async () => {
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

    const response = await request(app.server)
      .post(`/schedule/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        date: new Date('2022-01-01T13:00:00.000Z'),
      })

    expect(response.statusCode).toBe(200)
  })
})
