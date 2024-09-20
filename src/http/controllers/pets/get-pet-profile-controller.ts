import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetPetProfileService } from '@/services/factories/make-get-pet-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const routeParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = routeParamsSchema.parse(request.params)

  const getPetProfileService = makeGetPetProfileService()

  try {
    const { pet } = await getPetProfileService.execute({ petId: id })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
