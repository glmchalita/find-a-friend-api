import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach, vi } from 'vitest'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { makeOng } from 'tests/factories/make-ong.factory'
import { SearchPetsService } from './search-pets'
import { makePet } from 'tests/factories/make-pet.factory'
import { afterEach } from 'node:test'

describe('Create Pet Service', () => {
  let ongsRepository: InMemoryOngsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsService

  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository(ongsRepository)
    sut = new SearchPetsService(petsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search a pet by city', async () => {
    const ong1 = await ongsRepository.create(makeOng())
    const ong2 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({ ...makePet(), ong_id: ong1.id })
    const pet2 = await petsRepository.create({ ...makePet(), ong_id: ong1.id })
    await petsRepository.create({ ...makePet(), ong_id: ong2.id })
    await petsRepository.create({ ...makePet(), ong_id: ong2.id })

    const { pets } = await sut.execute({ city: ong1.city })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })

  it('should be able to search a pet by species', async () => {
    const ong1 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      species: 'Dog',
    })

    const pet2 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      species: 'Dog',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      species: 'Cat',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      species: 'Cat',
    })

    const { pets } = await sut.execute({ city: ong1.city, species: 'Dog' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })

  it('should be able to search a pet by size', async () => {
    const ong1 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      size: 'Small',
    })

    const pet2 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      size: 'Small',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      size: 'Medium',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      size: 'Large',
    })

    const { pets } = await sut.execute({ city: ong1.city, size: 'Small' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })

  it('should be able to search a pet by breed', async () => {
    const ong1 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      breed: 'Dachshund',
    })

    const pet2 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      breed: 'Dachshund',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      breed: 'Mixed',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      breed: 'Golden',
    })

    const { pets } = await sut.execute({ city: ong1.city, breed: 'Dachshund' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })

  it('should be able to search a pet by color', async () => {
    const ong1 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      color: 'Black',
    })

    const pet2 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      color: 'Black',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      color: 'Brown',
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      color: 'White',
    })

    const { pets } = await sut.execute({ city: ong1.city, color: 'Black' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })

  it('should be able to search a pet by size', async () => {
    const ong1 = await ongsRepository.create(makeOng())

    const pet1 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      birth_date: new Date('2024-05-16'),
    })

    const pet2 = await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      birth_date: new Date('2023-05-16'),
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      birth_date: new Date('2022-05-16'),
    })

    await petsRepository.create({
      ...makePet(),
      ong_id: ong1.id,
      birth_date: new Date('2021-05-16'),
    })

    const { pets } = await sut.execute({ city: ong1.city, age: '2' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining(pet1),
      expect.objectContaining(pet2),
    ])
  })
})
