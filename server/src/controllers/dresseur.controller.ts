import { Request, Response } from 'express'
import { deleteDresseurSchema, updatePokedexSchema } from '../dtos/dresseur.dtos'
import { Dresseur } from '../models/dresseur.model'
class DresseurController {
  async getAll(req: Request, res: Response) {
    const dresseurs = await Dresseur.find().select('-password').select('-email')

    if (dresseurs.length <= 0) {
      res.status(404).json({ error: "Aucun dresseur n'a été trouvé" })
    }
    res.json({
      dresseurs,
    })
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const dresseur = await Dresseur.findById(id).select('-password').select('-email')

    if (!dresseur) {
      res.status(404).json({ error: 'Dresseur non trouvé' })
      return
    }

    res.json(dresseur)
  }

  async updatePokedex(req: Request, res: Response) {
    const { id } = req.params
    const { pokedex } = req.body

    const { error } = updatePokedexSchema.validate({ id, pokedex })
    if (error) {
      res.status(400).json({ error: error.message })
      return
    }

    // Récupérer le dresseur actuel pour vérifier son pokedex existant
    const dresseur = await Dresseur.findById(id)

    if (!dresseur) {
      res.status(404).json({ error: 'Dresseur non trouvé' })
      return
    }

    // Mettre à jour le pokedex
    const dresseurMisAJour = await Dresseur.findByIdAndUpdate(id, { pokedex }, { new: true })

    res.json({
      message: 'Pokedex mis à jour avec succès',
      dresseur: dresseurMisAJour,
    })
  }

  async addInPokedex(req: Request, res: Response) {
    const { id } = req.params
    const pokemon = req.body
    const dresseur = await Dresseur.findById({ _id: id })

    if (!dresseur) {
      res.status(404).json({ error: 'Dresseur non trouvé' })
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
    const pokemonId = req.params.pokemonId

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

    const { error } = deleteDresseurSchema.validate({ id })
    if (error) {
      res.status(400).json({ error: error.message })
      return
    }

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

  async getPokedex(req: Request, res: Response) {
    const { id } = req.params
    const dresseur = await Dresseur.findById(id)

    if (!dresseur) {
      res.status(404).json({ error: 'Dresseur non trouvé' })
      return
    }

    return res.json({
      message: 'Pokedex récupéré avec succès',
      pokedex: dresseur.pokedex,
    })
  }
}

export default new DresseurController()
