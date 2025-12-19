import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGetCurrentUser } from '@/hooks/use-get-current-user'
import { getPokemons } from '@/hooks/use-get-pokemons'
import { cn } from '@/lib/utils'
import { apiClient } from '@/services/api-client'
import type { IPokemon } from '@/types/pokemon.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import type { FC, JSX } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createEquipeSchema, type CreateEquipeFormValues } from './create-equipe.schema'

export const CreateEquipe: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const commandListRef = useRef<HTMLDivElement>(null)
  const { user } = useGetCurrentUser()

  const form = useForm<CreateEquipeFormValues>({
    resolver: zodResolver(createEquipeSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      pokemons: [],
    },
  })

  // Charger la liste des pokémons au montage du composant
  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getPokemons()
        setPokemons(data)
      } catch (error) {
        console.error('Erreur lors du chargement des pokémons:', error)
      }
    }
    loadPokemons()
  }, [])

  async function onSubmit(values: CreateEquipeFormValues) {
    const selectedPokemons = pokemons.filter((pokemon) => values.pokemons.includes(pokemon.id))
    const equipeData = {
      name: values.name,
      pokemons: selectedPokemons,
    }

    await apiClient.post(`/api/equipe`, { ...equipeData, dresseurId: user?._id })
    toast.success('Équipe créée avec succès')

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une équipe</DialogTitle>
          <DialogDescription>
            Créez une nouvelle équipe de pokémons en sélectionnant un nom et vos pokémons préférés.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)(e)
            }}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'équipe</FormLabel>
                  <FormControl>
                    <Input placeholder='Mon équipe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='pokemons'
              render={({ field }) => {
                const error = form.formState.errors.pokemons
                return (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Pokémons</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type='button'
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-full justify-between',
                            !field.value?.length && 'text-muted-foreground',
                            error && 'border-destructive'
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} pokémon(s) sélectionné(s)`
                            : 'Sélectionnez des pokémons...'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-[400px] p-0 overflow-visible' align='start'>
                        <Command className='flex flex-col h-full'>
                          <CommandInput placeholder='Rechercher un pokémon...' />
                          <CommandList
                            ref={commandListRef}
                            onWheel={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            <CommandEmpty>Aucun pokémon trouvé.</CommandEmpty>
                            <CommandGroup>
                              {pokemons.map((pokemon) => (
                                <CommandItem
                                  key={pokemon.id}
                                  value={pokemon.name}
                                  onSelect={() => {
                                    const fieldValue = field.value || []
                                    const newValue = fieldValue.includes(pokemon.id)
                                      ? fieldValue.filter((id: number) => id !== pokemon.id)
                                      : [...fieldValue, pokemon.id]
                                    field.onChange(newValue)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value?.includes(pokemon.id)
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className='w-10 h-10'
                                  />
                                  {pokemon.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />

                    <div className='flex flex-wrap gap-2'>
                      {field.value?.map((pokemonId: number) => (
                        <Badge key={pokemonId} variant={'outline'}>
                          <img
                            src={pokemons.find((pokemon) => pokemon.id === pokemonId)?.image}
                            alt={pokemons.find((pokemon) => pokemon.id === pokemonId)?.name}
                            className='w-4 h-4'
                          />
                          {pokemons.find((pokemon) => pokemon.id === pokemonId)?.name}
                        </Badge>
                      ))}
                    </div>
                  </FormItem>
                )
              }}
            />

            <Button type='submit' className='w-full'>
              Créer l'équipe
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
