export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

class PokemonService {
  private async fetchFromApi<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`PokeAPI error: ${response.status}`)
    }
    return response.json() as Promise<T>
  }

  /* Récupérer plusieurs Pokémon en format personnalisé */
  async getAll(limit = 151, offset = 0): Promise<Pokemon[]> {
    const listData = await this.fetchFromApi<{ results: { name: string }[] }>(
      `${process.env.POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    )

    const promises = listData.results.map((p) => this.getById(p.name))
    return Promise.all(promises)
  }

  /* Récupérer un Pokémon par ID*/
  async getById(id: number | string): Promise<Pokemon> {
    const url = `${process.env.POKE_API_BASE_URL}/pokemon/${id}`
    const data = await this.fetchFromApi<any>(url)

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t: any) => t.type.name),
    }
  }
}

export default new PokemonService()
