import { GetPetProfileService } from '../get-pet-profile'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetProfileService() {
  const petsRepository = new PrismaPetsRepository()
  const service = new GetPetProfileService(petsRepository)

  return service
}
