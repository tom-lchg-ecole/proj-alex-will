import { useEffect, useState } from 'react'
import { authService } from '../services/auth.service'
import type { IUser } from '../types/user.type'

/**
 * Hook pour récupérer les données de l'utilisateur connecté
 * @returns Les données de l'utilisateur, l'état de chargement et les erreurs
 */
export const useGetCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Vérifier si un token existe avant de faire l'appel
        const token = localStorage.getItem('token')
        if (!token) {
          setUser(null)
          setIsLoading(false)
          return
        }

        const userData = await authService.getCurrentUser()
        setUser(userData)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erreur lors de la récupération de l'utilisateur"
        setError(errorMessage)
        setUser(null)
        // Supprimer le token si invalide
        if (
          err instanceof Error &&
          (err.message?.includes('Token') || err.message?.includes('authentification'))
        ) {
          localStorage.removeItem('token')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading, error }
}
