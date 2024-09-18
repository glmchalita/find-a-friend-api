import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterPetService } from './register-pet'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let ongsRepository: InMemoryOngsRepository
let sut: RegisterPetService

describe('Register ONG Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    ongsRepository = new InMemoryOngsRepository()
    sut = new RegisterPetService(petsRepository, ongsRepository)
  })

  it('should be able to register a pet', async () => {
    await ongsRepository.create({
      id: 'ong-01',
      name: 'TypeScript ONG',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password_hash: '123456',
      address_id: 'address_id',
    })

    const { pet } = await sut.execute({
      name: 'Lylla',
      species: 'DOG',
      size: 'Medium',
      color: 'Black',
      breed: 'Mixed',
      birth_on_date: new Date(),
      ong_id: 'ong-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet if ONG doesnt exists', async () => {
    await expect(() =>
      sut.execute({
        name: 'Lylla',
        species: 'DOG',
        size: 'Medium',
        color: 'Black',
        breed: 'Mixed',
        birth_on_date: new Date(),
        ong_id: 'ong-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
