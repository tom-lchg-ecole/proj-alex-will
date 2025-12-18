import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// Extension de l'interface Request pour inclure l'utilisateur
export interface AuthRequest extends Request {
  user?: {
    id: string
  }
}

/**
 * Middleware d'authentification pour vérifier le token JWT
 * Vérifie la présence du header Authorization: Bearer <token>
 * Décode et valide le token, puis ajoute l'ID utilisateur à req.user
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Récupérer le header Authorization
    const authHeader = req.headers.authorization

    // Vérifier si le header existe et commence par "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Token d'authentification manquant ou invalide",
        data: null,
      })
    }

    // Extraire le token (enlever "Bearer ")
    const token = authHeader.substring(7)

    // Vérifier que JWT_SECRET est défini
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Erreur de configuration serveur',
        data: null,
      })
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string }

    // Ajouter l'ID utilisateur à la requête
    req.user = {
      id: decoded.id,
    }

    next()
  } catch (error: any) {
    // Gérer les erreurs JWT (token expiré, invalide, etc.)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré',
        data: null,
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide',
        data: null,
      })
    }

    return res.status(401).json({
      success: false,
      message: "Erreur d'authentification",
      data: null,
    })
  }
}
