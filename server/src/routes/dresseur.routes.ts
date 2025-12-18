import { Router } from 'express'
import dresseurController from '../controllers/dresseur.controller'

export const dresseurRoutes = Router()


dresseurRoutes
    .get('/', dresseurController.getAll)
    .get('/:id', dresseurController.getById)
    .put('/:id', dresseurController.updatePokedex)
    .delete('/:id', dresseurController.delete)
