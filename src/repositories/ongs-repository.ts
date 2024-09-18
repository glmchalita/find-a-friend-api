import { Address, Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
  findByEmail(email: string): Promise<Ong | null>
  findByCNPJ(cnpj: string): Promise<Ong | null>
  findById(id: string): Promise<Ong | null>
  findManyByCity(addresses: Address[]): Promise<Ong[] | null>
}
