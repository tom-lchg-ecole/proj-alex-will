import { useGetCurrentUser } from '@/hooks/use-get-current-user'
import { apiClient } from '@/services/api-client'
import type { IPokemon } from '@/types/pokemon.type'
import type { FC, JSX } from 'react'
import { useLocation } from 'react-router-dom'
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

  // Pour afficher le bouton supprimer uniquement dans le pokedex
  const { pathname } = useLocation()

  const addPokemonToPokedex = async () => {
    await apiClient.post(`/api/dresseur/${user?._id}/pokedex/add`, pokemon)
    toast.success('Pokémon ajouté au pokedex')
  }

  const removePokemonFromPokedex = async () => {
    await apiClient.delete(`/api/dresseur/${user?._id}/pokedex/remove/${pokemon.id}`)
    toast.success('Pokémon supprimé du pokedex')
    document.location.reload()
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
          <CardFooter className='flex flex-col gap-1'>
            {pathname !== '/pokedex' && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  addPokemonToPokedex()
                }}
              >
                Ajouter au pokedex
              </Button>
            )}

            {pathname === '/pokedex' && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  removePokemonFromPokedex()
                }}
                variant='destructive'
              >
                Supprimer du pokedex
              </Button>
            )}
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
