import { EquipeCard } from '@/components/equipe-card'
import type { FC, JSX } from 'react'

export const ProfilPage: FC = (): JSX.Element => {
  // récupérer les informations de l'utilisateur

  return (
    <section className='space-y-12 max-w-2xl mx-auto'>
      <article className='space-y-2'>
        <h1 className='text-5xl font-bold'>Profil</h1>
      </article>

      <article>
        <h2 className='text-2xl font-bold'>Mes informations</h2>
        <div className='space-y-2 mt-4'>
          <p>Nom d'utilisateur</p>
          <p>Email</p>
          <p>Mot de passe</p>
        </div>
      </article>

      <article className='space-y-4'>
        <h2 className='text-2xl font-bold'>Mes Équipes</h2>

        {/* TODO: Utiliser .map */}
        <EquipeCard
          equipe={{
            id: '1',
            name: 'Équipe 1',
            pokemons: [],
          }}
        />
      </article>
    </section>
  )
}
