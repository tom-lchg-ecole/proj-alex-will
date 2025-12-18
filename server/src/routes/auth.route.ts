import { Request, Response, Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { signInSchema, signUpSchema } from '../dtos/auth.dtos'
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'

export const authRoute = Router()

authRoute
  .post('/sign-up', validationMiddleware(signUpSchema), async (req: Request, res: Response) => {
    try {
      const data = req.body
      // Appel au contrôleur pour créer le dresseur
      const response = await authController.signUp(data)
      res.json({ message: 'Dresseur créé avec succès', data: response })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })

  // TODO: Créer le schéma DTOS et ajouter le middleware à la route
  // TODO: JWT TOKEN RENVOYER AU CLIENT
  .post('/sign-in', validationMiddleware(signInSchema), async (req: Request, res: Response) => {
    const data = req.body
    try {
      const response = await authController.signIn(data)
      res.json({ message: 'Dresseur connecté avec succès', data: response })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })
  .get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      // req.user est défini par le middleware authMiddleware
      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' })
      }

      const dresseur = await authController.getCurrentUser(req.user.id)
      res.json({ message: 'Dresseur récupéré avec succès', data: dresseur })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  })
