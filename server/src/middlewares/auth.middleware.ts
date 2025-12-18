import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { signUnSchema } from '../schemas/auth.schema'

class AuthMiddleware {
  /**
   * Middleware de validation pour sign-up
   * Valide les données avec le schéma Mongoose avant de passer au contrôleur
   */
  validateSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body

      // Création d'un document temporaire pour la validation
      const SignUnModel = mongoose.model('SignUnValidation', signUnSchema)
      const signUnDoc = new SignUnModel(data)

      // Validation des données avec le schéma Mongoose
      const validationError = signUnDoc.validateSync()

      if (validationError) {
        const errors = Object.values(validationError.errors || {}).map((err: any) => err.message)
        return res.status(400).json({
          message: 'Erreur de validation',
          errors,
        })
      }

      // Si la validation réussit, passer au prochain middleware/contrôleur
      next()
    } catch (error: any) {
      // Gestion des erreurs de validation Mongoose
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors || {}).map((err: any) => err.message)
        return res.status(400).json({
          message: 'Erreur de validation',
          errors,
        })
      }

      res.status(500).json({
        message: 'Erreur lors de la validation',
        error: error.message,
      })
    }
  }
}

export const authMiddleware = new AuthMiddleware()
