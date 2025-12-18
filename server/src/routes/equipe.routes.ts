import { Router } from 'express'
import equipeController from '../controllers/equipe.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const equipeRoutes = Router()


equipeRoutes
    .post('/', authMiddleware, equipeController.create)
    .get('/', equipeController.getAll)
    .get('/:id', equipeController.getById)
    .get('/dresseur/:dresseurId', equipeController.getByDresseur)
    .put('/:id', authMiddleware, equipeController.update)
    .delete('/:id', authMiddleware, equipeController.delete)
