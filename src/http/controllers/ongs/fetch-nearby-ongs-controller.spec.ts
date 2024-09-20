import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOng } from 'tests/factories/make-ong.factory'

describe('Fetch Nearby ONGs (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby ONGs', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong).expect(201)

    const response = await request(app.server)
      .get('/ongs/nearby')
      .query({ latitude: ong.latitude, longitude: ong.longitude })
      .expect(200)

    expect(response.body.ongs).toHaveLength(1)
    expect(response.body.ongs[0].name).toEqual(ong.name)
  })
})
