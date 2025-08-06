import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'

let prisma: PrismaService
let jwtService: JwtEncrypter

describe('Create member', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /member/:organizationId - should be able to create a new member', async () => {
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
      .post(`/member/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        role: 'MEMBER',
      })

    expect(response.statusCode).toBe(201)
  })
})
