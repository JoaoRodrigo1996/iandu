import { app } from '@/infra/app'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { PrismaService } from '@/infra/database/prisma'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { ClientFactory } from 'test/factories/make-client'

let prisma: PrismaService
let clientFactory: ClientFactory
let jwtService: JwtEncrypter

describe('Create organization', () => {
  beforeAll(async () => {
    await app.ready()
    prisma = new PrismaService()
    jwtService = new JwtEncrypter(app)
    clientFactory = new ClientFactory(prisma)
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /organization - should be able to create new organization', async () => {
    const client = await clientFactory.makePrismaClient()
    const access_token = await jwtService.encrypt({ sub: client.id.toString() })

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
