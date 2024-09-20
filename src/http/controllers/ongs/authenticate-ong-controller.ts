import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateOngService } from '@/services/factories/make-authenticate-ong-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateOngController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateOngService = makeAuthenticateOngService()

    const { ong } = await authenticateOngService.execute({ email, password })

    const token = await reply.jwtSign({}, { sign: { sub: ong.id } })

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: ong.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
