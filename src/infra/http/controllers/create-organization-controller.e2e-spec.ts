import { app } from '@/infra/app'
import { PrismaService } from '@/infra/database/prisma'
import request from 'supertest'

let prismaService: PrismaService

describe('Create organization', () => {
  beforeAll(async () => {
    await app.ready()
    prismaService = new PrismaService()
  })

  afterAll(async () => {
    app.close()
  })

  it('[POST] /organization - should be able to create new organization', async () => {
    const client = await prismaService.client.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        userName: 'johndoe',
        password: '12345678',
      },
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const { access_token } = authResponse.body

    const response = await request(app.server)
      .post('/organization')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        address: {
          city: 'Miami',
          complement: 'Apt 123',
          neighborhood: 'Downtown',
          number: 123,
          state: 'FL',
          street: 'Main St',
          zip: '12345',
        },
        cnpj: '12345678901234',
        description: 'A organization description',
        sector: 'Services',
        phone: '(99) 99999-9999',
      })

    console.log(`CLIENT -> ${client.email}`)
    console.log(`TOKEN -> ${access_token}`)
    console.log(`RESPONSE -> ${response.body.organization}`)
  })
})
