import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from './components/navbar'
import './index.css'
import { PokedexPage } from './pages/pokedex.page'
import { PokemonsPage } from './pages/pokemon.page'
import { ProfilPage } from './pages/profil.page'
import { SignInPage } from './pages/sign-in.page'
import { SignUpPage } from './pages/sign-up.page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className='mt-24 px-2'>
        <Routes>
          <Route path='/' element={<PokemonsPage />} />
          <Route path='/profil' element={<ProfilPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/pokedex' element={<PokedexPage />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
)
