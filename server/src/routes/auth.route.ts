import { Request, Response, Router } from 'express'
import { authController } from '../controller/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const authRoute = Router()

authRoute
  .post('/sign-up', authMiddleware.validateSignUp, async (req: Request, res: Response) => {
    try {
      const data = req.body
      await authController.signUp(data)
      res.json({ message: 'User signed up successfully' })
    } catch (error: any) {
      res.status(500).json({
        message: "Erreur lors de l'inscription",
        error: error.message,
      })
    }
  })

  .post('/sign-in', async (req: Request, res: Response) => {
    const data = req.body
    await authController.signIn(data)
    res.json({ message: 'User signed in successfully' })
  })
