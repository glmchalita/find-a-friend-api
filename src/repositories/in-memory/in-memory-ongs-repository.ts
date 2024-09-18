import { Address, Ong, Prisma } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOngsRepository implements OngsRepository {
  public items: Ong[] = []

  async create(data: Prisma.OngUncheckedCreateInput) {
    const ong = {
      id: data.id ?? randomUUID(),
      name: data.name,
      phone: data.phone,
      cnpj: data.cnpj,
      email: data.email,
      password_hash: data.password_hash,
      address_id: data.address_id,
      created_at: new Date(),
    }

    this.items.push(ong)

    return ong
  }

  async findByEmail(email: string) {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByCNPJ(cnpj: string) {
    const ong = this.items.find((item) => item.cnpj === cnpj)

    if (!ong) {
      return null
    }

    return ong
  }

  async findById(id: string) {
    const ong = this.items.find((item) => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findManyByCity(addresses: Address[]) {
    const addressesIdSet = new Set(addresses.map((addresses) => addresses.id))

    const ongs = this.items.filter((item) =>
      addressesIdSet.has(item.address_id),
    )

    if (ongs.length === 0) {
      return null
    }

    return ongs
  }
}
