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
import { getPokemons } from '@/hooks/use-get-pokemons'
import { cn } from '@/lib/utils'
import { apiClient } from '@/services/api-client'
import type { IEquipe } from '@/types/equipe.type'
import type { IPokemon } from '@/types/pokemon.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Pencil } from 'lucide-react'
import type { FC, JSX } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateEquipeSchema, type UpdateEquipeFormValues } from './update-equipe.schema'

interface IUpdateEquipeProps {
  equipe: IEquipe
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: JSX.Element
}

export const UpdateEquipe: FC<IUpdateEquipeProps> = ({
  equipe,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}): JSX.Element => {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange || setInternalOpen
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const commandListRef = useRef<HTMLDivElement>(null)

  const form = useForm<UpdateEquipeFormValues>({
    resolver: zodResolver(updateEquipeSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: equipe.name,
      pokemons: equipe.pokemons.map((pokemon) => pokemon.id),
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

  // Réinitialiser le formulaire quand l'équipe change ou quand le dialogue s'ouvre
  useEffect(() => {
    if (open) {
      form.reset({
        name: equipe.name,
        pokemons: equipe.pokemons.map((pokemon) => pokemon.id),
      })
    }
  }, [open, equipe, form])

  async function onSubmit(values: UpdateEquipeFormValues) {
    try {
      const selectedPokemons = pokemons.filter((pokemon) => values.pokemons.includes(pokemon.id))
      const equipeData = {
        name: values.name,
        pokemons: selectedPokemons,
      }

      await apiClient.patch(`/api/equipe/${equipe._id}`, equipeData)
      toast.success('Équipe mise à jour avec succès')
      setOpen(false)

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'équipe")
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && controlledOpen === undefined && (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <Pencil />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'équipe</DialogTitle>
          <DialogDescription>Modifiez le nom et les pokémons de votre équipe.</DialogDescription>
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
                    <Popover>
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
              Mettre à jour l'équipe
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
