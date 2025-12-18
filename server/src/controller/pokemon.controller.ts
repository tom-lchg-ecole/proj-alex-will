import { Request, Response } from 'express';
import pokemonService from '../services/pokemon.service';

class PokemonController {
  async getAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 151;
      const offset = Number(req.query.offset) || 0;

      const pokemons = await pokemonService.getAll(limit, offset);

      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des Pokémon' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const pokemon = await pokemonService.getById(id);

      res.json(pokemon);
    } catch (error) {
      res.status(404).json({ message: 'Pokémon non trouvé' });
    }
  }
}

export default new PokemonController();
