import { Router } from 'express'
import equipeController from '../controllers/equipe.controller'

export const equipeRoutes = Router()


equipeRoutes
    .post('/', equipeController.create)
    .get('/', equipeController.getAll)
    .get('/:id', equipeController.getById)
    .get('/dresseur/:dresseurId', equipeController.getByDresseur)
    .put('/:id', equipeController.update)
    .delete('/:id', equipeController.delete)
