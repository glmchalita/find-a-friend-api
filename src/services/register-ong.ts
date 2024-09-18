import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { CnpjAlreadyRegisteredError } from './errors/cnpj-already-registered-error'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'
import { AddressesRepository } from '@/repositories/addresses-repository'

interface RegisterOngServiceRequest {
  name: string
  city: string
  state: string
  zipcode: string
  street: string
  street_number: string
  phone: string
  cnpj: string
  email: string
  password: string
}

interface RegisterOngServiceResponse {
  ong: Ong
}

export class RegisterOngService {
  constructor(
    private ongsRepository: OngsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    name,
    city,
    state,
    zipcode,
    street,
    street_number,
    phone,
    cnpj,
    email,
    password,
  }: RegisterOngServiceRequest): Promise<RegisterOngServiceResponse> {
    const address = await this.addressesRepository.create({
      city,
      state,
      zipcode,
      street,
      street_number,
    })

    const password_hash = await bcryptjs.hash(password, 6)

    const ongWithSameCNPJ = await this.ongsRepository.findByCNPJ(cnpj)

    if (ongWithSameCNPJ) {
      throw new CnpjAlreadyRegisteredError()
    }

    const ongWithSameEmail = await this.ongsRepository.findByEmail(email)

    if (ongWithSameEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const ong = await this.ongsRepository.create({
      name,
      phone,
      cnpj,
      email,
      password_hash,
      address_id: address.id,
    })

    return { ong }
  }
}
