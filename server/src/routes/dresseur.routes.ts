import { Router } from 'express'
import dresseurController from '../controllers/dresseur.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const dresseurRoutes = Router()

dresseurRoutes
  .get('/', dresseurController.getAll)
  .get('/:id', dresseurController.getById)
  .put('/:id', authMiddleware, dresseurController.updatePokedex)
  .post('/:id/pokedex/add', authMiddleware, dresseurController.addInPokedex)
  .delete('/:id/pokedex/remove/:pokemonId', authMiddleware, dresseurController.removeFromPokedex)
  .get('/:id/pokedex', dresseurController.getPokedex)
  .delete('/:id', authMiddleware, dresseurController.delete)
