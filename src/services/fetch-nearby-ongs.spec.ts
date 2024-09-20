import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { FetchNearbyOngsService } from './fetch-nearby-ongs'
import { makeOng } from 'tests/factories/make-ong.factory'

describe('Fetch Nearby Orgs Use Case', () => {
  let ongsRepository: InMemoryOngsRepository
  let sut: FetchNearbyOngsService

  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new FetchNearbyOngsService(ongsRepository)
  })

  it('should be able to fetch nearby ongs', async () => {
    const ong = await ongsRepository.create(makeOng())

    const nearbyOngs = await sut.execute({
      userLatitude: ong.latitude.toNumber(),
      userLongitude: ong.longitude.toNumber(),
    })

    expect(nearbyOngs.ongs).toEqual([ong])
  })
})
