import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { CnpjAlreadyRegisteredError } from './errors/cnpj-already-registered-error'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'

interface CreateOngServiceRequest {
  name: string
  author_name: string
  whatsapp: string
  cnpj: string
  email: string
  password: string

  cep: string
  state: string
  city: string
  street: string

  latitude: number
  longitude: number
}

interface CreateOngServiceResponse {
  ong: Ong
}

export class CreateOngService {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    name,
    author_name,
    whatsapp,
    cnpj,
    email,
    password,

    cep,
    state,
    city,
    street,

    latitude,
    longitude,
  }: CreateOngServiceRequest): Promise<CreateOngServiceResponse> {
    const ongWithSameCNPJ = await this.ongsRepository.findByCNPJ(cnpj)
    if (ongWithSameCNPJ) throw new CnpjAlreadyRegisteredError()

    const ongWithSameEmail = await this.ongsRepository.findByEmail(email)
    if (ongWithSameEmail) throw new EmailAlreadyRegisteredError()

    const ong = await this.ongsRepository.create({
      name,
      author_name,
      whatsapp,
      cnpj,
      email,
      password: await bcryptjs.hash(password, 6),

      cep,
      state,
      city,
      street,

      latitude,
      longitude,
    })

    return { ong }
  }
}
