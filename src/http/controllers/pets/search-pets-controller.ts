import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import { Species, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchQuerySchema = z.object({
    city: z.string(),
    species: z.enum([Species.Dog, Species.Cat]).optional(),
    size: z.enum([Size.Small, Size.Medium, Size.Large]).optional(),
    breed: z.string().optional(),
    color: z.string().optional(),
    age: z.string().optional(),
  })

  const { city, species, size, breed, color, age } = searchQuerySchema.parse(
    request.query,
  )

  const createOngService = makeSearchPetsService()

  const { pets } = await createOngService.execute({
    city,
    species,
    size,
    breed,
    color,
    age,
  })

  return reply.status(200).send({ pets })
}
