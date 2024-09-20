import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOng } from 'tests/factories/make-ong.factory'

describe('Authenticate ONG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able authenticate a ONG', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const response = await request(app.server)
      .post('/ongs/authenticate')
      .send({ email: ong.email, password: ong.password })

    expect(response.statusCode).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
