import type { IPokemon } from '@/types/pokemon.type'
import type { FC, JSX } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { apiClient } from '@/services/api-client'

interface IPokemonCardProps {
  pokemon: IPokemon
}

export const PokemonCard: FC<IPokemonCardProps> = ({ pokemon }): JSX.Element => {
  // push to /pokemon/:name au click

const ajouter = async () => {
  const response = await apiClient.post('/api/dresseur/69440d02b8b5e71344daaa3e/pokedex/add', pokemon)
  console.log(response)
  console.log(pokemon)
}
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='cursor-pointer hover:bg-accent/50 transition-colors duration-100'>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle><p>#{pokemon.id}</p>
            <CardDescription>
              <p>{pokemon.types.join(', ')}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              ajouter()
            }}
          >
            ajouter
          </Button>
        </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <img src={pokemon.image} alt={pokemon.name} width={128} height={128} />
          <DialogTitle>{pokemon.name}</DialogTitle>
          <DialogDescription>
            <p>{pokemon.types.join(', ')}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
