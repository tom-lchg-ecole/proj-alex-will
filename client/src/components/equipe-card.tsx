import type { IEquipe } from '@/types/equipe.type'
import { Pencil, Settings2, Trash2 } from 'lucide-react'
import type { FC, JSX } from 'react'
import { PokemonCard } from './pokemon-card'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface IEquipeCardProps {
  equipe: IEquipe
}

export const EquipeCard: FC<IEquipeCardProps> = ({ equipe }): JSX.Element => {
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Pencil /> <span>Renommer</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant='destructive'>
                <Trash2 /> <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </CardHeader>

      <CardContent>
        <div className='flex flex-wrap gap-4'>
          {/* TODO: Utiliser .map */}
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
        </div>
      </CardContent>
    </Card>
  )
}
