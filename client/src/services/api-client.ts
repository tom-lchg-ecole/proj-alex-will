/**
 * `api-client.ts` sera utilisé pour définir les fonctions permettant d'effectuer
 * les requêtes CRUD basiques vers l'API depuis le client.
 * Il centralise la logique d'appel réseau pour standardiser et simplifier l'accès aux ressources.
 */

class ApiClient {
  private baseUrl = 'http://localhost:3000'

  /**
   * Récupère les headers avec le token d'authentification si disponible
   * @returns Headers avec Content-Type et Authorization si token présent
   */
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('token')

    // Ajouter le header Authorization si le token existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders(),
    })
    return response.json()
  }

  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders(),
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async patch(endpoint: string, data: unknown) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders(),
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders(),
      method: 'DELETE',
    })
    return response.json()
  }
}

export const apiClient = new ApiClient()
