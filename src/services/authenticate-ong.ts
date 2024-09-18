import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateOngServiceRequest {
  email: string
  password: string
}

interface AuthenticateOngServiceResponse {
  ong: Ong
}

export class AuthenticateOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOngServiceRequest): Promise<AuthenticateOngServiceResponse> {
    const ong = await this.ongsRepository.findByEmail(email)

    if (!ong) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcryptjs.compare(
      password,
      ong.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { ong }
  }
}
