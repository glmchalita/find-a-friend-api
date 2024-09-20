import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'

interface FetchNearbyOngsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOngsServiceResponse {
  ongs: Ong[]
}

export class FetchNearbyOngsService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOngsServiceRequest): Promise<FetchNearbyOngsServiceResponse> {
    const ongs = await this.ongsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { ongs }
  }
}
