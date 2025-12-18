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

interface IPokemonCardProps {
  pokemon: IPokemon
}

export const PokemonCard: FC<IPokemonCardProps> = ({ pokemon }): JSX.Element => {
  // push to /pokemon/:name au click

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='cursor-pointer hover:bg-accent/50 transition-colors duration-100'>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
            <CardDescription>
              <p>{pokemon.types.join(', ')}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
          </CardContent>
          <CardFooter>
            <p>#{pokemon.id}</p>
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
