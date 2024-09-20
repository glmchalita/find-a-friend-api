import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { Size, Species } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createPetBodyScema = z.object({
    name: z.string(),
    species: z.enum([Species.Dog, Species.Cat]),
    size: z.enum([Size.Small, Size.Medium, Size.Large]),
    breed: z.string(),
    color: z.string(),
    birth_date: z.coerce.date(),
  })

  const body = createPetBodyScema.parse(request.body)

  const createPetService = makeCreatePetService()

  try {
    const { pet } = await createPetService.execute({
      ...body,
      ong_id: request.user.sub,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
