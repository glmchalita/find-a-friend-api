import { FastifyInstance } from 'fastify'
import { createOngController } from './create-ong-controller'
import { authenticateOngController } from './authenticate-ong-controller'
import { fetchNearbyOngsController } from './fetch-nearby-ongs-controller'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ongs', createOngController)
  app.post('/ongs/authenticate', authenticateOngController)
  app.get('/ongs/nearby', fetchNearbyOngsController)
}
