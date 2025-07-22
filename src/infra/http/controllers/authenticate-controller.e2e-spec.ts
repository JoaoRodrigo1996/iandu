import { app } from '@/infra/app'
import request from 'supertest'

describe('Authenticate account (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /sessions - should authenticate an account', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      userName: 'johndoe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String)
    })
  })
})
