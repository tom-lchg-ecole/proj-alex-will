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
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC, JSX } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Schéma de validation pour le formulaire de connexion
const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
  password: z
    .string()
    .min(1, { message: 'Le mot de passe est requis' })
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
})

type SignInFormValues = z.infer<typeof signInSchema>

export const SignInPage: FC = (): JSX.Element => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignInFormValues) {
    try {
      // Appel à l'API pour la connexion
      // TODO: Rediriger vers la page d'accueil ou le profil
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      // TODO: Afficher un message d'erreur à l'utilisateur
    }
  }

  return (
    <section className='space-y-12 max-w-2xl mx-auto'>
      <article className='space-y-2'>
        <h1 className='text-5xl font-bold'>Connexion</h1>
        <p className='text-muted-foreground'>Connectez-vous à votre compte pour continuer</p>
      </article>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
            Se connecter
          </Button>
        </form>
      </Form>
    </section>
  )
}
