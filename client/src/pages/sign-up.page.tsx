import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/services/api-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FC, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

// Schéma de validation pour le formulaire d'inscription
const signUpSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Le nom d'utilisateur est requis" })
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }),
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
  password: z
    .string()
    .min(1, { message: 'Le mot de passe est requis' })
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export const SignUpPage: FC = (): JSX.Element => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: SignUpFormValues) {
    try {
      // Appel à l'API pour l'inscription
      await apiClient.post('/auth/sign-up', values)
      // TODO: Rediriger vers la page de connexion ou le profil
      navigate('/sign-in')
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      // TODO: Afficher un message d'erreur à l'utilisateur
    }
  }

  return (
    <section className='space-y-12 max-w-2xl mx-auto'>
      <article className='space-y-2'>
        <h1 className='text-5xl font-bold'>Inscription</h1>
        <p className='text-muted-foreground'>Créez votre compte pour commencer</p>
      </article>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='votre_nom_utilisateur' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='votre@email.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='••••••••' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            S'inscrire
          </Button>
        </form>
      </Form>
    </section>
  )
}
