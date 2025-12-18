import { useEffect, useState, type FC, type JSX } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { isAuthenticated, logout } from '../utils/auth.utils'
import { Button } from './ui/button'
import { buttonVariants } from './ui/button-variants'

export const Navbar: FC = (): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Vérifier l'état d'authentification au montage et lors des changements
  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated())
    }

    // Vérifier au montage
    checkAuth()

    const handleStorageChange = () => {
      checkAuth()
    }
    window.addEventListener('storage', handleStorageChange)
    const interval = setInterval(checkAuth, 100)

    // clean up function
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    navigate('/sign-in')
  }

  return (
    <nav className='fixed top-2 left-0 right-0 z-50 bg-zinc-200 border border-zinc-300 w-fit mx-auto py-2 px-4 rounded-full flex justify-between items-center gap-6'>
      <Link to='/'>Pokémons</Link>
      <Link to='/pokedex'>Pokédex</Link>
      {authenticated && <Link to='/profil'>Profil</Link>}
      <section className='space-x-2'>
        {authenticated ? (
          <Button variant='destructive' onClick={handleLogout}>
            Déconnexion
          </Button>
        ) : (
          <>
            <Link to='/sign-in' className={cn(buttonVariants())}>
              Connexion
            </Link>
            <Link to='/sign-up' className={cn(buttonVariants({ variant: 'outline' }))}>
              Inscription
            </Link>
          </>
        )}
      </section>
    </nav>
  )
}
