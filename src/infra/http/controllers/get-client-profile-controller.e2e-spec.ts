import { app } from '@/infra/app'
import request from 'supertest'

describe('Get client profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should get client profile', async () => {
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678'
    });

    const { access_token } = authResponse.body

    const result = await request(app.server).get('/me').set('Authorization', `Bearer ${access_token}`).send()

    expect(result.statusCode).toBe(200)
    expect(result.body.client).toEqual(expect.objectContaining({
      email: 'johndoe@example.com'
    }))
  })
})
