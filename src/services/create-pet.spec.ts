import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { CreatePetService } from './create-pet'
import { makePet } from 'tests/factories/make-pet.factory'
import { makeOng } from 'tests/factories/make-ong.factory'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Create Pet Service', () => {
  let petsRepository: InMemoryPetsRepository
  let ongsRepository: InMemoryOngsRepository
  let sut: CreatePetService

  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository(ongsRepository)
    sut = new CreatePetService(petsRepository, ongsRepository)
  })

  it('should be able to create a new pet', async () => {
    const ong = await ongsRepository.create({
      ...makeOng(),
      password: '123456',
    })

    const { pet } = await sut.execute(makePet({ ong_id: ong.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with non-existing ONG', async () => {
    await expect(() => sut.execute(makePet())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
