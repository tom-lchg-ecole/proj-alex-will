import { EquipeCard } from '@/components/equipe-card'
import { CreateEquipe } from '@/features/create-equipe/create-equipe'
import { useGetCurrentUser } from '@/hooks/use-get-current-user'
import { apiClient } from '@/services/api-client'
import type { IEquipe } from '@/types/equipe.type'
import { useEffect, useState, type FC, type JSX } from 'react'

export const ProfilPage: FC = (): JSX.Element => {
  // récupérer les informations de l'utilisateur
  const { user, isLoading } = useGetCurrentUser()
  const [equipes, setEquipes] = useState<IEquipe[]>([])

  useEffect(() => {
    const loadEquipes = async () => {
      const { equipes } = await apiClient.get(`/api/equipe/dresseur/${user?._id}`)
      setEquipes(equipes)
    }
    loadEquipes()
  }, [user?._id])

  if (isLoading) return <div>Chargement...</div>

  return (
    <section className='space-y-12 max-w-2xl mx-auto'>
      <article className='space-y-2'>
        <h1 className='text-5xl font-bold'>Profil</h1>
      </article>

      <article>
        <h2 className='text-2xl font-bold'>Mes informations</h2>
        <div className='space-y-2 mt-4'>
          <p>Nom d'utilisateur: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </article>

      <article className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>Mes Équipes</h2>
          {/* FEATURE: Créer une équipe */}
          <CreateEquipe />
          {/* FEATURE: Créer une équipe */}
        </div>

        {equipes.map((equipe) => (
          <EquipeCard key={equipe._id} equipe={equipe} />
        ))}
      </article>
    </section>
  )
}
