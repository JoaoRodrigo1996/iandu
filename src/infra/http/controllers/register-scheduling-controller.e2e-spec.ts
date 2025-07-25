import { app } from '@/infra/app'
import request from 'supertest'

describe('Register schedule controller (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /schedule - should be able to create new schedule', async () => {
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const { access_token } = authResponse.body

    const organizationId = '02b5e880-13d0-49f9-9480-37d4876eb7a4'

    const result = await request(app.server)
      .post(`/schedule/${organizationId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        date: new Date(),
      })

    expect(result.statusCode).toBe(200)
  })
})
