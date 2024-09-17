import { ONG, Prisma } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'

export class InMemoryOngsRepository implements OngsRepository {
  public items: ONG[] = []

  async create(data: Prisma.ONGCreateInput) {
    const ong = {
      id: 'ong-1',
      name: data.name,
      city: data.city,
      phone: data.phone,
      cnpj: data.cnpj,
      email: data.email,
      password_hash: data.password_hash,
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
}
