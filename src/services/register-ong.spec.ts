import { it, describe, expect, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { RegisterOngService } from './register-ong'

let ongsRepository: InMemoryOngsRepository
let sut: RegisterOngService

describe('Register ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new RegisterOngService(ongsRepository)
  })

  it('should be able to register', async () => {
    const { ong } = await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { ong } = await sut.execute({
      name: 'TypeScript ONG',
      city: 'São Paulo',
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
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'TypeScript ONG',
        city: 'São Paulo',
        phone: '1199999999',
        cnpj: '11111111111111',
        email: 'typescriptong@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })
})
