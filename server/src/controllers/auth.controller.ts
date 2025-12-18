import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Dresseur, IDresseur } from '../models/dresseur.model'

class AuthController {
  // Sign up est la route pour créer un nouveau dresseur (user)
  async signUp(data: IDresseur) {
    try {
      // Chercher si un dresseur avec cet email existe déjà
      const dresseur = await Dresseur.findOne({ email: data.email })
      if (dresseur) {
        throw new Error('Un dresseur avec cette email existe déjà')
      }

      // Hasher le mot de passe avant de créer le dresseur
      const hashedPassword = await bcrypt.hash(data.password, 10)

      // Créer le nouveau dresseur avec le mot de passe hashé
      const newDresseur = await Dresseur.create({
        ...data, // spread operator pour copier les propriétés de l'objet data et ajouté le password
        password: hashedPassword,
      })
      return newDresseur
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async signIn(data: { username: string; email: string; password: string }) {
    try {
      // Chercher si un dresseur avec cet email existe
      const dresseur = await Dresseur.findOne({ email: data.email })
      if (!dresseur) {
        throw new Error("Aucun dresseur avec cet email n'existe")
      }

      // Vérifier si le mot de passe est correct
      const isPasswordValid = await bcrypt.compare(data.password, dresseur.password)
      if (!isPasswordValid) {
        throw new Error('Le mot de passe est incorrect')
      }

      // Vérifier que JWT_SECRET est défini
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET n'est pas défini dans les variables d'environnement")
      }

      // Créer un token JWT
      return {
        token: jwt.sign({ id: dresseur._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        }),
        dresseur: dresseur,
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Récupère le dresseur connecté par son ID (sans le mot de passe)
  async getCurrentUser(userId: string) {
    try {
      // Récupérer le dresseur par ID en excluant le champ password
      const dresseur = await Dresseur.findById(userId).select('-password')

      if (!dresseur) {
        throw new Error('Dresseur non trouvé')
      }

      return dresseur
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const authController = new AuthController()
