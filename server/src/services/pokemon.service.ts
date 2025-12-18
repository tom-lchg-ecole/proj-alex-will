const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

class PokemonService {
  private async fetchFromApi<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`PokeAPI error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  /* Récupérer la liste des Pokémon*/
  async getAll(limit = 151, offset = 0): Promise<PokemonListResponse> {
    const url = `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    return this.fetchFromApi<PokemonListResponse>(url);
  }

  /* Récupérer un Pokémon par ID*/
  async getById(id: number | string) {
    const url = `${POKE_API_BASE_URL}/pokemon/${id}`;
    return this.fetchFromApi(url);
  }
}

export default new PokemonService();
