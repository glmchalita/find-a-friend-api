import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overwrite = {
  id?: string

  name?: string
  author_name?: string
  whatsapp?: string
  cnpj?: string
  email?: string
  password?: string

  cep?: string
  state?: string
  city?: string
  street?: string

  latitude?: number
  longitude?: number
}

export function makeOng(overwrite?: Overwrite) {
  return {
    id: overwrite?.id ?? randomUUID(),

    name: overwrite?.name ?? faker.company.name(),
    author_name: overwrite?.author_name ?? faker.person.fullName(),
    whatsapp: overwrite?.whatsapp ?? faker.phone.number(),
    cnpj:
      overwrite?.cnpj ??
      faker.number.int({ min: 10000000000000, max: 99999999999999 }).toString(),
    email: overwrite?.email ?? faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),

    cep: overwrite?.cep ?? faker.location.zipCode('########'),
    state: overwrite?.state ?? faker.location.state(),
    city: overwrite?.city ?? faker.location.city(),
    street: overwrite?.street ?? faker.location.streetAddress(),

    latitude: overwrite?.latitude ?? faker.location.latitude(),
    longitude: overwrite?.longitude ?? faker.location.longitude(),
  }
}
