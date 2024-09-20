import { makeCrateOngService } from '@/services/factories/make-create-ong-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOngController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOngBodyScema = z.object({
    name: z.string(),
    author_name: z.string(),
    whatsapp: z.string(),
    cnpj: z.string().min(14).max(14),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const body = createOngBodyScema.parse(request.body)

  const createOngService = makeCrateOngService()

  await createOngService.execute(body)

  return reply.status(201).send()
}
