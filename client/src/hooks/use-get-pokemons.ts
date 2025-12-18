import { apiClient } from '../services/api-client.ts'
import type { IPokemon } from '../types/pokemon.type.ts'

export const getPokemons = async () => {
  const data: IPokemon[] = await apiClient.get('/api/pokemons')
  return data
}
