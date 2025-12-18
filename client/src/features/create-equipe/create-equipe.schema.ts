import z from 'zod'

export const createEquipeSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  pokemons: z
    .array(z.number())
    .min(1, { message: 'Sélectionnez au moins un pokémon' })
    .max(6, { message: 'Vous ne pouvez sélectionner que 6 pokémons' }),
})

export type CreateEquipeFormValues = z.infer<typeof createEquipeSchema>
