import { Router } from 'express'
import { createDresseur } from '../controller/dresseur.controller'

export const dresseurRoutes = Router()

dresseurRoutes.post('/', createDresseur)

