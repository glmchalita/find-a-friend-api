import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileService } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileService(petsRepository)
  })

  it('should be able to get pet profile', async () => {
    const petCreated = await petsRepository.create({
      name: 'Lylla',
      species: 'DOG',
      size: 'Medium',
      color: 'Black',
      breed: 'Mixed',
      birth_on_date: new Date(),
      ong_id: 'ong-01',
    })

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    expect(pet.name).toEqual('Lylla')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
