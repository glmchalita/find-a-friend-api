import { Ong, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OngsRepository {
  create(data: Prisma.OngCreateInput): Promise<Ong>
  findByEmail(email: string): Promise<Ong | null>
  findByCNPJ(cnpj: string): Promise<Ong | null>
  findById(id: string): Promise<Ong | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Ong[]>
}
