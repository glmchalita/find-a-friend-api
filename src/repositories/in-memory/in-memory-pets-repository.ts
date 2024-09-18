import { Ong, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-01',
      name: data.name,
      species: data.species,
      breed: data.breed,
      color: data.color,
      size: data.size,
      birth_on_date: new Date(data.birth_on_date),
      ong_id: data.ong_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  findManysByCity(ongs: Ong[]) {}
}
