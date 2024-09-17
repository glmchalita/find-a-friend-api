import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { CNPJAlreadyRegisteredError } from './errors/cnpj-already-registered-error'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'

interface RegisterOngServiceRequest {
  name: string
  city: string
  phone: string
  cnpj: string
  email: string
  password: string
}

interface RegisterOngServiceResponse {
  ong: Ong
}

export class RegisterOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    name,
    city,
    phone,
    cnpj,
    email,
    password,
  }: RegisterOngServiceRequest): Promise<RegisterOngServiceResponse> {
    const password_hash = await bcryptjs.hash(password, 6)

    const ongWithSameCNPJ = await this.ongsRepository.findByCNPJ(cnpj)

    if (ongWithSameCNPJ) {
      throw new CNPJAlreadyRegisteredError()
    }

    const ongWithSameEmail = await this.ongsRepository.findByEmail(email)

    if (ongWithSameEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const ong = await this.ongsRepository.create({
      name,
      city,
      phone,
      cnpj,
      email,
      password_hash,
    })

    return { ong }
  }
}
