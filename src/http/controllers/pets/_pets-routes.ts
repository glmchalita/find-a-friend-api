import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet-controller'
import { searchPetsController } from './search-pets-controller'
import { getPetProfileController } from './get-pet-profile-controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/ongs/pets', { onRequest: [verifyJwt] }, createPetController)
  app.get('/ongs/pets', searchPetsController)
  app.get('/ongs/pets/:id', getPetProfileController)
}
