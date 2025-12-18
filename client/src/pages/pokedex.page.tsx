import { PokemonCard } from '@/components/pokemon-card'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/services/api-client'
import type { IPokemon } from '@/types/pokemon.type'
import { useEffect, useState, type FC, type JSX } from 'react'

export const PokedexPage: FC = (): JSX.Element => {
  const [pokedex, setPokedex] = useState<IPokemon[]>([])

  useEffect(() => {
    const loadPokedex = async () => {
      const { pokedex } = await apiClient.get('/api/dresseur/694427839e364a80bab760c4/pokedex')
      setPokedex(pokedex)
    }
    loadPokedex()
  }, [])

  console.log(pokedex)

  return (
    <section className='space-y-12'>
      <article className='space-y-2'>
        <h1 className='text-5xl font-bold'>Pokédex</h1>
        <p>Liste de tous les Pokémons capturés.</p>
      </article>

      <article className='max-w-lg mx-auto'>
        <Input placeholder='Rechercher un Pokémon' className='rounded-full py-6' />
      </article>

      <article className='text-center text-muted-foreground'>
        <p>Affichage de 1595 sur 1595 Pokémon</p>
      </article>

      <article className='flex flex-wrap gap-4'>
        {pokedex.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </article>
    </section>
  )
}
