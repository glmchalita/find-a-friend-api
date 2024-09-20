import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOng } from 'tests/factories/make-ong.factory'

describe('Create ONG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a ONG', async () => {
    const response = await request(app.server).post('/ongs').send(makeOng())

    expect(response.statusCode).toEqual(201)
  })
})
