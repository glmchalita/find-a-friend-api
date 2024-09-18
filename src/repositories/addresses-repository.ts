import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  findManyByCity(city: string): Promise<Address[] | null>
}
