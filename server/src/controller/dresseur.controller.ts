import { Request, Response } from 'express'
import { Dresseur } from '../models/Dresseur'

/**
 * Créer un nouveau dresseur
 */
export const createDresseur = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(400).json({
        error: 'username, email ou password non renseigné',
      })
      return
    }

    const dresseur = new Dresseur({ username, email, password })
    await dresseur.save()

    res.status(201).json({
      message: 'Dresseur créé avec succès',
      dresseur,
    })
  } catch (error) {
    console.error('Erreur lors de la création du dresseur:', error)
    res.status(500).json({
      error: 'Erreur lors de la création du dresseur',
    })
  }
}

