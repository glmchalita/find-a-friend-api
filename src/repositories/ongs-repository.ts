import { Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  create(data: Prisma.OngCreateInput): Promise<Ong>
  findByEmail(email: string): Promise<Ong | null>
  findByCNPJ(cnpj: string): Promise<Ong | null>
}
