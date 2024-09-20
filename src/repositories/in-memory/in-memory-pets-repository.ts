import { Pet, Prisma } from '@prisma/client'
import { findAllParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOngsRepository } from './in-memory-ongs-repository'
import dayjs from 'dayjs'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private ongsRepository: InMemoryOngsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      species: data.species,
      size: data.size,
      breed: data.breed,
      color: data.color,
      birth_date: new Date(data.birth_date),
      ong_id: data.ong_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) || null
  }

  async findAll(params: findAllParams) {
    const ongs = this.ongsRepository.items.filter(
      (item) => item.city === params.city,
    )

    const pets = this.items
      .filter((item) => ongs.some((ong) => ong.id === item.ong_id))
      .filter((item) =>
        params.species ? item.species === params.species : true,
      )
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.color ? item.color === params.color : true))
      .filter((item) => (params.breed ? item.breed === params.breed : true))
      .filter((item) => {
        if (params.age) {
          const petAge = dayjs().diff(dayjs(item.birth_date), 'months')

          return petAge <= Number(params.age) * 12
        }
        return true
      })

    return pets
  }
}
