import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Button } from './components/ui/button'
import { buttonVariants } from './components/ui/button-variants'
import './index.css'
import { cn } from './lib/utils'
import { PokedexPage } from './pages/pokedex.page'
import { PokemonsPage } from './pages/pokemon.page'
import { ProfilPage } from './pages/profil.page'
import { SignInPage } from './pages/sign-in.page'
import { SignUpPage } from './pages/sign-up.page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <nav className='fixed top-2 left-0 right-0 z-50 bg-zinc-200 border border-zinc-300 w-fit mx-auto py-2 px-4 rounded-full flex justify-between items-center gap-6'>
        <Link to='/'>Pokémons</Link>
        <Link to='/pokedex'>Pokédex</Link>
        <Link to='/profil'>Profil</Link>
        <section className='space-x-2'>
          <Link to='/sign-in' className={cn(buttonVariants())}>
            Connexion
          </Link>
          <Link to='/sign-up' className={cn(buttonVariants({ variant: 'outline' }))}>
            Inscription
          </Link>
          <Button variant='destructive'>Déconnexion</Button>
        </section>
      </nav>
      <main className='mt-24 px-2'>
        <Routes>
          <Route path='/' element={<PokemonsPage />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/pokedex' element={<PokedexPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
)
