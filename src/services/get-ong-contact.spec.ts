import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { GetOngContactService } from './get-ong-contact'

let ongsRepository: InMemoryOngsRepository
let sut: GetOngContactService

describe('Register ONG Service', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new GetOngContactService(ongsRepository)
  })

  it('should be able to get ONG contact', async () => {
    const ong = await ongsRepository.create({
      name: 'TypeScript ONG',
      phone: '1199999999',
      cnpj: '11111111111111',
      email: 'typescriptong@example.com',
      password_hash: '123456',
      address_id: 'address_id',
    })

    const { phone } = await sut.execute({ ongId: ong.id })

    expect(phone).toEqual('1199999999')
  })
})
