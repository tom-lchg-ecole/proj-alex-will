import bcrypt from 'bcrypt'
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
    console.log(data)
  }
}

export const authController = new AuthController()
