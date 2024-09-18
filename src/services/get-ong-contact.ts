import { OngsRepository } from '@/repositories/ongs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOngContactServiceRequest {
  ongId: string
}

interface GetOngContactServiceResponse {
  phone: string
}

export class GetOngContactService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    ongId,
  }: GetOngContactServiceRequest): Promise<GetOngContactServiceResponse> {
    const ong = await this.ongsRepository.findById(ongId)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    return { phone: ong.phone }
  }
}
