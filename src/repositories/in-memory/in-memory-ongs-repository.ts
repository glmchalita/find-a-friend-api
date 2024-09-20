import { Ong, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OngsRepository } from '../ongs-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOngsRepository implements OngsRepository {
  public items: Ong[] = []

  async create(data: Prisma.OngCreateInput) {
    const ong = {
      id: data.id ?? randomUUID(),

      name: data.name,
      author_name: data.author_name,
      whatsapp: data.whatsapp,
      cnpj: data.cnpj,
      email: data.email,
      password: data.password,

      cep: data.cep,
      state: data.state,
      city: data.city,
      street: data.street,

      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),

      created_at: new Date(),
    }

    this.items.push(ong)

    return ong
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null
  }

  async findByCNPJ(cnpj: string) {
    return this.items.find((item) => item.cnpj === cnpj) || null
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) || null
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
