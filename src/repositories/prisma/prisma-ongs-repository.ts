import { Ong, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OngsRepository } from '../ongs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOngsRepository implements OngsRepository {
  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({ data })

    return ong
  }

  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({ where: { email } })

    return ong
  }

  async findByCNPJ(cnpj: string) {
    const ong = await prisma.ong.findUnique({ where: { cnpj } })

    return ong
  }

  async findById(id: string) {
    const ong = await prisma.ong.findUnique({ where: { id } })

    return ong
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const ongs = await prisma.$queryRaw<Ong[]>`
    SELECT * from ongs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
  `

    return ongs
  }
}
