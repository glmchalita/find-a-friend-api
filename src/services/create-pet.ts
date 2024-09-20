import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetServiceRequest {
  name: string
  species: 'Dog' | 'Cat'
  size: 'Small' | 'Medium' | 'Large'
  breed: string
  color: string
  birth_date: Date
  ong_id: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private ongsRepository: OngsRepository,
  ) {}

  async execute({
    name,
    species,
    size,
    breed,
    color,
    birth_date,
    ong_id,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const ong = await this.ongsRepository.findById(ong_id)

    if (!ong) throw new ResourceNotFoundError()

    const pet = await this.petsRepository.create({
      name,
      species,
      breed,
      color,
      size,
      birth_date,
      ong_id,
    })

    return { pet }
  }
}
