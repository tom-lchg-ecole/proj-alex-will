import { UpdateEquipe } from '@/features/update-equipe/update-equipe'
import { apiClient } from '@/services/api-client'
import type { IEquipe } from '@/types/equipe.type'
import { Pencil, Settings2, Trash2 } from 'lucide-react'
import type { FC, JSX } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { PokemonCard } from './pokemon-card'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface IEquipeCardProps {
  equipe: IEquipe
}

export const EquipeCard: FC<IEquipeCardProps> = ({ equipe }): JSX.Element => {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

  const handleDelete = async () => {
    await apiClient.delete(`/api/equipe/${equipe._id}`)
    toast.success('Équipe supprimée avec succès')
  }

  return (
    <Card>
      <CardHeader>
        <article className='flex justify-between items-center'>
          <CardTitle>{equipe.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon-sm'>
                <Settings2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
                <Pencil /> <span>Modifier</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant='destructive' onClick={handleDelete}>
                <Trash2 /> <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-3 gap-2'>
          {equipe.pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </CardContent>
      <UpdateEquipe equipe={equipe} open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} />
    </Card>
  )
}
