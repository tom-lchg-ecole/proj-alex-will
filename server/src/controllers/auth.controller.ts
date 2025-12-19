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
      return {
        message: 'Dresseur créé avec succès',
        data: newDresseur,
        code: 200,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        data: null,
        code: 500,
        success: false,
      }
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

      // Créer un token JWT
      const token = jwt.sign({ id: dresseur._id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      })
      return {
        message: 'Dresseur connecté avec succès',
        data: { token, dresseur },
        code: 200,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        data: null,
        code: 500,
        success: false,
      }
    }
  }

  // Récupère le dresseur connecté par son ID (sans le mot de passe)
  async getCurrentUser(userId: string | undefined) {
    try {
      if (!userId) {
        throw new Error('Utilisateur non authentifié')
      }

      // Récupérer le dresseur par ID en excluant le champ password
      const dresseur = await Dresseur.findById(userId).select('-password')

      if (!dresseur) {
        throw new Error('Dresseur non trouvé')
      }

      return {
        message: 'Dresseur récupéré avec succès',
        data: dresseur,
        code: 200,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        data: null,
        code: 500,
        success: false,
      }
    }
  }
}

export const authController = new AuthController()
