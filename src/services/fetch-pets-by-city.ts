import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { AddressesRepository } from '@/repositories/addresses-repository'

interface GetPetProfileServiceRequest {
  city: string
}

interface GetPetProfileServiceResponse {
  pets: Pet[]
}

export class GetPetProfileService {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    city,
  }: GetPetProfileServiceRequest): Promise<GetPetProfileServiceResponse> {
    const addresses = await this.addressesRepository.findManyByCity(city)

    if (!addresses) {
      throw new Error()
    }

    const ongs = await this.ongsRepository.findManyByCity(addresses)

    if (!ongs) {
      throw new Error()
    }

    const pets = await this.petsRepository.findManysByCity(ongs)
    return { pets }
  }
}
