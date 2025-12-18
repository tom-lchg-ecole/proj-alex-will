import { Request, Response } from 'express'
import { Dresseur, IDresseur } from '../models/dresseur.model'

class DresseurController {

    async getAll(req: Request, res: Response) {
        const dresseurs = await Dresseur.find()

        if (dresseurs.length <= 0){
            res.status(404).json({ error: 'Aucun dresseur n\'a été trouvé'})
        }
        res.json({
            dresseurs,
        })
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const dresseur = await Dresseur.findById(id)

        if (!dresseur) {
            res.status(404).json({ error: 'Dresseur non trouvé' })
            return
        }

        res.json(dresseur)
    }

    async updatePokedex(req: Request, res: Response) {
        const { id } = req.params
        const { pokedex } = req.body

        if (!pokedex || !Array.isArray(pokedex)) {
            res.status(400).json({ error: 'Le champ pokedex doit être un tableau' })
            return
        }

        const dresseur = await Dresseur.findByIdAndUpdate(id, { pokedex }, { new: true })

        if (!dresseur) {
            res.status(404).json({ error: 'Dresseur non trouvé' })
            return
        }

        res.json({
            message: 'Pokedex mis à jour avec succès',
            dresseur,
        })
    }

    async addInPokedex(req: Request, res: Response) {
        const { id } = req.params
        const { pokemon } = req.body

        if (!pokemon || !pokemon.id || !pokemon.name || !pokemon.image || !pokemon.types) {
            res.status(400).json({ error: 'L\'objet pokemon complet est requis (id, name, image, types)' })
            return
        }

        const dresseur = await Dresseur.findById(id)

        if (!dresseur) {
            res.status(404).json({ error: 'Dresseur non trouvé' })
            return
        }
        
        const exists = dresseur.pokedex.some(p => p.id === pokemon.id)
        if (exists) {
            res.status(400).json({ error: 'Ce Pokémon est déjà dans le Pokedex' })
            return
        }

        dresseur.pokedex.push(pokemon)
        await dresseur.save()

        res.json({
            message: 'Pokémon ajouté au Pokedex avec succès',
            dresseur,
        })
    }

    async removeFromPokedex(req: Request, res: Response) {
        const { id } = req.params
        const { pokemonId } = req.body

        if (!pokemonId) {
            res.status(400).json({ error: 'Le pokemonId est requis' })
            return
        }

        const dresseur = await Dresseur.findByIdAndUpdate(
            id,
            { $pull: { pokedex: { id: pokemonId } } },
            { new: true }
        )

        if (!dresseur) {
            res.status(404).json({ error: 'Dresseur non trouvé' })
            return
        }

        res.json({
            message: 'Pokémon retiré du Pokedex avec succès',
            dresseur,
        })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const dresseur = await Dresseur.findByIdAndDelete(id)

        if (!dresseur) {
            res.status(404).json({ error: 'Dresseur non trouvé' })
            return
        }

        res.json({
            message: 'Dresseur supprimé avec succès',
            dresseur,
        })
    }
}

export default new DresseurController()
