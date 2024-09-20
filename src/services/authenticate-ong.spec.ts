import { it, describe, expect, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { AuthenticateOngService } from './authenticate-ong'
import { makeOng } from 'tests/factories/make-ong.factory'

let ongsRepository: InMemoryOngsRepository
let sut: AuthenticateOngService

describe('Authenticate Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new AuthenticateOngService(ongsRepository)
  })

  it('should be able to authenticate', async () => {
    const ong = await ongsRepository.create(
      makeOng({
        email: 'example@test.com',
        password: await bcryptjs.hash('123456', 6),
      }),
    )

    const { ong: authenticatedOng } = await sut.execute({
      email: 'example@test.com',
      password: '123456',
    })

    expect(authenticatedOng).toEqual(ong)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await ongsRepository.create(
      makeOng({
        email: 'example@test.com',
        password: await bcryptjs.hash('123456', 6),
      }),
    )

    await expect(() =>
      sut.execute({
        email: 'wrong-email@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await ongsRepository.create(
      makeOng({
        email: 'example@test.com',
        password: await bcryptjs.hash('123456', 6),
      }),
    )

    await expect(() =>
      sut.execute({
        email: 'example@test.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
