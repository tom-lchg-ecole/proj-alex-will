import { Router } from 'express';
import pokemonController from '../controller/pokemon.controller';

export const pokemonRoutes = Router();

pokemonRoutes.get('/pokemons', pokemonController.getAll)
.get('/pokemons/:id', pokemonController.getById);
