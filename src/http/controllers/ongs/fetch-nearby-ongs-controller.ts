import { makeFetchNearbyOngsService } from '@/services/factories/make-fetch-nearby-ongs-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchNearbyOngsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyOngsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyOngsQuerySchema.parse(request.query)

  const fetchNearbyOngsService = makeFetchNearbyOngsService()

  const { ongs } = await fetchNearbyOngsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ ongs })
}
