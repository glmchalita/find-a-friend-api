import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileService } from './get-pet-profile'
import { makePet } from 'tests/factories/make-pet.factory'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'

let ongsRepository: InMemoryOngsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository(ongsRepository)
    sut = new GetPetProfileService(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const createdPet = await petsRepository.create(makePet())

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet).toEqual(createdPet)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
