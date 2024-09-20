import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { FetchNearbyOngsService } from '../fetch-nearby-ongs'

export function makeFetchNearbyOngsService() {
  const ongsRepository = new PrismaOngsRepository()
  const service = new FetchNearbyOngsService(ongsRepository)

  return service
}
