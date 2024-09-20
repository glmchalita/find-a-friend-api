import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOng } from 'tests/factories/make-ong.factory'
import { makePet } from 'tests/factories/make-pet.factory'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    const response = await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    expect(response.statusCode).toEqual(201)
  })
})
