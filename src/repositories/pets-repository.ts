import { Pet, Prisma, Size, Species } from '@prisma/client'

export interface findAllParams {
  city: string
  species?: Species
  size?: Size
  breed?: string
  color?: string
  age?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(params: findAllParams): Promise<Pet[]>
}
