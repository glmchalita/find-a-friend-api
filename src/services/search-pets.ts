import { Pet, Size, Species } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsServiceRequest {
  city: string
  species?: Species
  size?: Size
  breed?: string
  color?: string
  age?: string
}

interface SearchPetsServiceResponse {
  pets: Pet[]
}

export class SearchPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    species,
    breed,
    color,
    size,
    age,
  }: SearchPetsServiceRequest): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      species,
      breed,
      color,
      size,
      age,
    })

    return { pets }
  }
}
