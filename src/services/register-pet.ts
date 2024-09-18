import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Species } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetServiceRequest {
  name: string
  species: Species
  breed: string
  color: string
  size: string
  birth_on_date: Date
  ong_id: string
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
  ) {}

  async execute({
    name,
    species,
    breed,
    color,
    size,
    birth_on_date,
    ong_id,
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const ong = await this.ongsRepository.findById(ong_id)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      species,
      breed,
      color,
      size,
      birth_on_date,
      ong_id,
    })

    return { pet }
  }
}
