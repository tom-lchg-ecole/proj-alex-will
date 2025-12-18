import { PokemonCard } from '@/components/pokemon-card'
import { Input } from '@/components/ui/input'
import type { FC, JSX } from 'react'

export const PokedexPage: FC = (): JSX.Element => {
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
        <PokemonCard
          pokemon={{
            id: '1',
            name: 'Bulbizarre',
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            types: ['Plante', 'Poison'],
          }}
        />
        <PokemonCard
          pokemon={{
            id: '1',
            name: 'Bulbizarre',
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            types: ['Plante', 'Poison'],
          }}
        />
        <PokemonCard
          pokemon={{
            id: '1',
            name: 'Bulbizarre',
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            types: ['Plante', 'Poison'],
          }}
        />
      </article>
    </section>
  )
}
