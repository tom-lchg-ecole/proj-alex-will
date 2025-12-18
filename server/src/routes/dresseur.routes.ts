import { Router } from 'express'
import dresseurController from '../controllers/dresseur.controller'

export const dresseurRoutes = Router()

dresseurRoutes
  .get('/', dresseurController.getAll)
  .get('/:id', dresseurController.getById)
  .put('/:id', dresseurController.updatePokedex)
  .post('/:id/pokedex/add', dresseurController.addInPokedex)
  .post('/:id/pokedex/remove', dresseurController.removeFromPokedex)
  .get('/:id/pokedex', dresseurController.getPokedex)
  .delete('/:id', dresseurController.delete)
