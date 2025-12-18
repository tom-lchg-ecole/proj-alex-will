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

      // Créer le nouveau dresseur
      const newDresseur = await Dresseur.create(data)
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
