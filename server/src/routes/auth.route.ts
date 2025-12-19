import { Request, Response, Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { signInSchema, signUpSchema } from '../dtos/auth.dtos'
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'

export const authRoute = Router()

authRoute
  .post('/sign-up', validationMiddleware(signUpSchema), async (req: Request, res: Response) => {
    const data = req.body
    const response = await authController.signUp(data)
    res
      .status(response.code)
      .json({ message: response.message, data: response.data, success: response.success })
  })

  // TODO: Créer le schéma DTOS et ajouter le middleware à la route
  // TODO: JWT TOKEN RENVOYER AU CLIENT
  .post('/sign-in', validationMiddleware(signInSchema), async (req: Request, res: Response) => {
    const data = req.body
    const response = await authController.signIn(data)
    res
      .status(response.code)
      .json({ message: response.message, data: response.data, success: response.success })
  })

  .get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
    const response = await authController.getCurrentUser(req.user?.id)
    res
      .status(response.code)
      .json({ message: response.message, data: response.data, success: response.success })
  })
