import { Prisma } from '@prisma/client'
import { findAllParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async findAll(params: findAllParams) {
    const whereClause: Prisma.PetWhereInput = {
      ong: {
        city: { contains: params.city },
      },
      species: params.species,
      size: params.size,
      color: params.color,
      breed: params.breed,
    }

    if (params.age && !isNaN(Number(params.age))) {
      whereClause.birth_date = {
        gte: dayjs().subtract(Number(params.age), 'years').toDate(), // Greater than or equal to the targetDate
      }
    }

    const pets = await prisma.pet.findMany({
      where: whereClause,
    })

    return pets
  }
}
