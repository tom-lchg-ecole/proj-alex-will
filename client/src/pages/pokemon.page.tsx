import { useEffect, useState } from 'react'
import { PokemonCard } from '@/components/pokemon-card'
import { Input } from '@/components/ui/input'
import type { FC, JSX } from 'react'
import { apiClient } from '../services/api-client.ts'
import type { IPokemon } from '../types/pokemon.type.ts'

export const PokemonsPage: FC = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data: IPokemon[] = await apiClient.get('/api/pokemons')
        setPokemons(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  console.log(pokemons)
  
  return (
    <section className='space-y-12'>
      <h1 className='text-5xl font-bold'>Pokémons</h1>

      <article className='max-w-lg mx-auto'>
        <Input placeholder='Rechercher un Pokémon' className='rounded-full py-6' />
      </article>

      <p className='text-center text-muted-foreground'>
        Affichage de {pokemons.length} Pokémon
      </p>

      {loading ? (
        <p className='text-center'>Chargement...</p>
      ) : (
        <article className='flex flex-wrap gap-4'>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </article>
      )}
    </section>
  )
}
