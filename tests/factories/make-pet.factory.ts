import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overwrite = {
  id?: string
  name?: string
  species?: 'Dog' | 'Cat'
  size?: 'Small' | 'Medium' | 'Large'
  breed?: string
  color?: string
  birth_date?: Date
  ong_id?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: overwrite?.id ?? randomUUID(),
    name: overwrite?.name ?? faker.person.firstName(),
    species: overwrite?.species ?? faker.helpers.arrayElement(['Dog', 'Cat']),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
    breed: overwrite?.breed ?? faker.animal.dog(),
    color: overwrite?.color ?? faker.color.human(),
    birth_date:
      overwrite?.birth_date ??
      faker.date.birthdate({ mode: 'age', min: 0, max: 4 }),
    ong_id: overwrite?.ong_id ?? crypto.randomUUID(),
  }
}
