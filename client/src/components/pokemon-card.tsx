import { useGetCurrentUser } from '@/hooks/use-get-current-user'
import { apiClient } from '@/services/api-client'
import type { IPokemon } from '@/types/pokemon.type'
import type { FC, JSX } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
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
  const { user } = useGetCurrentUser()

  const ajouter = async () => {
    await apiClient.post(`/api/dresseur/${user?._id}/pokedex/add`, pokemon)
    toast.success('Pokémon ajouté au pokedex')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='cursor-pointer hover:bg-accent/50 transition-colors duration-100'>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
            <p>#{pokemon.id}</p>
            <CardDescription>
              <p>{pokemon.types.join(', ')}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className='mx-auto'>
            <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                ajouter()
              }}
            >
              Ajouter au pokedex
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
