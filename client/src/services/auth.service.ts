import type { IUser } from '../types/user.type'
import { apiClient } from './api-client'

/**
 * Réponse de l'API pour getCurrentUser
 */
interface GetCurrentUserResponse {
  message: string
  data: IUser
}

/**
 * Service d'authentification pour gérer les opérations liées à l'authentification
 */
export const authService = {
  /**
   * Récupère les informations de l'utilisateur connecté
   * @returns Les données de l'utilisateur connecté
   * @throws Erreur si le token est invalide ou si l'utilisateur n'est pas trouvé
   */
  async getCurrentUser(): Promise<IUser> {
    try {
      const response = (await apiClient.get('/api/auth/profile')) as GetCurrentUserResponse

      if (!response.data) {
        throw new Error('Aucune donnée utilisateur retournée')
      }

      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Gérer les erreurs spécifiques
      if (error.message?.includes('Token') || error.message?.includes('authentification')) {
        throw new Error('Token invalide ou expiré')
      }

      if (error.message?.includes('non trouvé')) {
        throw new Error('Utilisateur non trouvé')
      }

      throw new Error(error.message || "Erreur lors de la récupération de l'utilisateur")
    }
  },
}
