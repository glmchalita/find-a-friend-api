import { Address, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AddressesRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []

  async create(data: Prisma.AddressCreateInput) {
    const address = {
      id: data.id ?? randomUUID(),
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      street: data.street,
      street_number: data.street_number,
    }

    this.items.push(address)

    return address
  }

  async findManyByCity(city: string) {
    const addresses = this.items.filter((item) => item.city === city)

    if (addresses.length === 0) {
      return null
    }

    return addresses
  }
}
