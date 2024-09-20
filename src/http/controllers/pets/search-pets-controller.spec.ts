import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOng } from 'tests/factories/make-ong.factory'
import { makePet } from 'tests/factories/make-pet.factory'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and species', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ species: 'Dog' }))

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ species: 'Dog' }))

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city, species: 'Dog' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and size', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'Medium' }))

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'Medium' }))

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city, size: 'Medium' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and color', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ color: 'Black' }))

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ color: 'Black' }))

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city, color: 'Black' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and breed', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ breed: 'Dashchund' }))

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ breed: 'Dashchund' }))

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city, breed: 'Dashchund' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to search pets by city and age', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ birth_date: new Date('2024-01-01') }))

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ birth_date: new Date('2022-05-16') }))

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and all filters', async () => {
    const ong = makeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/ongs/authenticate')
      .send({
        email: ong.email,
        password: ong.password,
      })

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/ongs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .query({ city: ong.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
