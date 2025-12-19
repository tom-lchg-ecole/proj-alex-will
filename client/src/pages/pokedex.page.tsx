import { PokemonCard } from '@/components/pokemon-card'
import { Input } from '@/components/ui/input'
import { useGetCurrentUser } from '@/hooks/use-get-current-user'
import { apiClient } from '@/services/api-client'
import type { IPokemon } from '@/types/pokemon.type'
import { useEffect, useState, type FC, type JSX } from 'react'

export const PokedexPage: FC = (): JSX.Element => {
  const [pokedex, setPokedex] = useState<IPokemon[]>([])
  const { user } = useGetCurrentUser()

  useEffect(() => {
    const loadPokedex = async () => {
      const { pokedex } = await apiClient.get(`/api/dresseur/${user?._id}/pokedex`)
      setPokedex(pokedex)
    }
    loadPokedex()
  }, [user?._id])

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

      {pokedex.length === 0 && (
        <div className='text-center text-muted-foreground text-lg my-8'>
          Aucun Pokémon dans le Pokédex
        </div>
      )}

      <article className='flex flex-wrap gap-4'>
        {pokedex.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </article>
    </section>
  )
}
