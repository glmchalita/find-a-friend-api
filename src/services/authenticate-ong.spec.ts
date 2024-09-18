import { it, describe, expect, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { AuthenticateOngService } from './authenticate-ong'

let ongsRepository: InMemoryOngsRepository
let sut: AuthenticateOngService

describe('Authenticate Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new AuthenticateOngService(ongsRepository)
  })

  it('should be able to authenticate', async () => {
    await ongsRepository.create({
      name: 'TypeScript ONG',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password_hash: await bcryptjs.hash('123456', 6),
      address_id: 'address_id',
    })

    const { ong } = await sut.execute({
      email: 'typescriptong@example.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'example@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await ongsRepository.create({
      name: 'TypeScript ONG',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password_hash: await bcryptjs.hash('123456', 6),
      address_id: 'address_id',
    })

    await expect(() =>
      sut.execute({
        email: 'example@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
