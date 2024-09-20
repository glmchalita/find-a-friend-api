import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { CreatePetService } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const ongsRepository = new PrismaOngsRepository()
  const service = new CreatePetService(petsRepository, ongsRepository)

  return service
}
