import { it, describe, expect, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { RegisterOngService } from './register-ong'
import { CnpjAlreadyRegisteredError } from './errors/cnpj-already-registered-error'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'

let ongsRepository: InMemoryOngsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: RegisterOngService

describe('Register ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new RegisterOngService(ongsRepository, addressesRepository)
  })

  it('should be able to register a ONG', async () => {
    const { ong } = await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
      state: 'São Paulo',
      zipcode: '04512-001',
      street: 'R. Diogo Jácome',
      street_number: '686',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should hash ONG password upon registration', async () => {
    const { ong } = await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
      state: 'São Paulo',
      zipcode: '04512-001',
      street: 'R. Diogo Jácome',
      street_number: '686',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      '123456',
      ong.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'example@test.com'

    await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
      state: 'São Paulo',
      zipcode: '04512-001',
      street: 'R. Diogo Jácome',
      street_number: '686',
      phone: '1199999999',
      cnpj: '11111111111111',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'TypeScript ONG',
        city: 'São Paulo',
        state: 'São Paulo',
        zipcode: '04512-001',
        street: 'R. Diogo Jácome',
        street_number: '686',
        phone: '1199999999',
        cnpj: '22222222222222',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })

  it('should not be able to register with same CNPJ twice', async () => {
    const cnpj = '11111111111111'

    await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
      state: 'São Paulo',
      zipcode: '04512-001',
      street: 'R. Diogo Jácome',
      street_number: '686',
      phone: '1199999999',
      cnpj,
      email: 'typescriptong@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'TypeScript ONG',
        city: 'São Paulo',
        state: 'São Paulo',
        zipcode: '04512-001',
        street: 'R. Diogo Jácome',
        street_number: '686',
        phone: '1199999999',
        cnpj,
        email: 'typescriptong2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CnpjAlreadyRegisteredError)
  })
})
