import { it, describe, expect, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { EmailAlreadyRegisteredError } from './errors/email-already-registered-error'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { CnpjAlreadyRegisteredError } from './errors/cnpj-already-registered-error'
import { CreateOngService } from './create-ong'
import { makeOng } from 'tests/factories/make-ong.factory'

describe('Create ONG Service', () => {
  let ongsRepository: InMemoryOngsRepository
  let sut: CreateOngService

  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new CreateOngService(ongsRepository)
  })

  it('should be able to create a new ONG', async () => {
    const { ong } = await sut.execute(makeOng())

    expect(ongsRepository.items).toHaveLength(1)
    expect(ong.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const { ong } = await sut.execute(makeOng({ password: '123456' }))

    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      '123456',
      ong.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const ong = makeOng()

    await sut.execute({ ...ong, cnpj: '1111' })

    await expect(() =>
      sut.execute({ ...ong, cnpj: '2222' }),
    ).rejects.toBeInstanceOf(EmailAlreadyRegisteredError)
  })

  it('should not be able to register with same CNPJ twice', async () => {
    const ong = makeOng()

    await sut.execute({ ...ong, email: 'example1@email.com' })

    await expect(() =>
      sut.execute({ ...ong, email: 'example2@email.com' }),
    ).rejects.toBeInstanceOf(CnpjAlreadyRegisteredError)
  })
})
