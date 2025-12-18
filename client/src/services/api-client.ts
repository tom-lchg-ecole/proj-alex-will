/**
 * `api-client.ts` sera utilisé pour définir les fonctions permettant d'effectuer
 * les requêtes CRUD basiques vers l'API depuis le client.
 * Il centralise la logique d'appel réseau pour standardiser et simplifier l'accès aux ressources.
 */

class ApiClient {
  private baseUrl = 'http://localhost:3000'
  private headers = {
    'Content-Type': 'application/json',
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers: this.headers })
    return response.json()
  }

  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async patch(endpoint: string, data: unknown) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      method: 'DELETE',
    })
    return response.json()
  }
}

export const apiClient = new ApiClient()
