import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { AuthenticateOngService } from '../authenticate-ong'

export function makeAuthenticateOngService() {
  const ongsRepository = new PrismaOngsRepository()
  const service = new AuthenticateOngService(ongsRepository)

  return service
}
