/**
 * Type pour représenter un utilisateur (dresseur) côté client
 * Ne contient pas le champ password pour des raisons de sécurité
 */
export interface IUser {
  _id: string
  username: string
  email: string
  pokedex: string[]
  createdAt: Date
  updatedAt: Date
}

