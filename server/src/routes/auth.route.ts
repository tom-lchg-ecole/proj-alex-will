import { Request, Response, Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { signUpSchema } from '../dtos/auth.dtos'
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
      res.status(500).json({ success: false, message: error.message, data: null })
    }
  })

  // TODO: Créer le schéma DTOS et ajouter le middleware à la route
  // TODO: JWT TOKEN RENVOYER AU CLIENT
  .post('/sign-in', async (req: Request, res: Response) => {
    const data = req.body
    await authController.signIn(data)
    res.json({ message: 'Dresseur connecté avec succès' })
  })
