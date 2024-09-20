import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { CreateOngService } from '../create-ong'

export function makeCrateOngService() {
  const ongsRepository = new PrismaOngsRepository()
  const service = new CreateOngService(ongsRepository)

  return service
}
