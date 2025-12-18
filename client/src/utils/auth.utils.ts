/**
 * Utilitaires pour gérer l'authentification côté client
 */

const TOKEN_KEY = 'token'

/**
 * Vérifie si un token d'authentification existe dans le localStorage
 * @returns true si un token existe, false sinon
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY)
  return token !== null && token !== ''
}

/**
 * Récupère le token d'authentification depuis le localStorage
 * @returns Le token ou null s'il n'existe pas
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Déconnecte l'utilisateur en supprimant le token du localStorage
 * et redirige vers la page de connexion
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  // Rediriger vers la page de connexion
  window.location.href = '/sign-in'
}
