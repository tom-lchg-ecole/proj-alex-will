import { Router } from 'express';
import pokemonController from '../controller/pokemon.controller';

const router = Router();

router.get('/pokemons', pokemonController.getAll);
router.get('/pokemons/:id', pokemonController.getById);

export default router;
