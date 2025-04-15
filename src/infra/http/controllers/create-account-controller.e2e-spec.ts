import request from 'supertest'

import { app } from '@/infra/app'

describe('Create account controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create new account', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      userName: 'johndoe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(201)
  })
})
