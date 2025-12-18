import { PokemonCard } from '@/components/pokemon-card'
import { Input } from '@/components/ui/input'
import { getPokemons } from '@/hooks/use-get-pokemons.ts'
import type { FC, JSX } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { IPokemon } from '../types/pokemon.type.ts'

export const PokemonsPage: FC = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getPokemons()
        setPokemons(data)
      } catch {
        toast.error('Une erreur est survenue lors du chargement des pokémons')
      } finally {
        setLoading(false)
      }
    }
    loadPokemons()
  }, [])

  return (
    <section className='space-y-12'>
      <h1 className='text-5xl font-bold text-center'>Pokémons</h1>

      <article className='max-w-lg mx-auto'>
        <Input placeholder='Rechercher un Pokémon' className='rounded-full py-6' />
      </article>

      <p className='text-center text-muted-foreground'>Affichage de {pokemons.length} Pokémon</p>

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
