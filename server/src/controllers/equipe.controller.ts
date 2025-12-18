import { Request, Response } from 'express'
import { Equipe, IEquipe } from '../models/equipe.model'


class EquipeController {
  async create(req: Request, res: Response) {
    const { name, pokemons, dresseurId } = req.body

    if (!name || !dresseurId) {
      res.status(400).json({ error: 'Le nom et le dresseurId sont requis' })
      return
    }

    if (!pokemons || pokemons.length === 0) {
      res.status(400).json({ error: 'Une équipe doit contenir au moins un Pokémon' })
      return
    }

    if (pokemons.length > 6) {
      res.status(400).json({ error: 'Une équipe ne peut pas contenir plus de 6 Pokémon' })
      return
    }

    const equipe = await Equipe.create({ name, pokemons, dresseurId })

    res.status(201).json({
      message: 'Équipe créée avec succès',
      equipe,
    })
  }

  async getAll(req: Request, res: Response) {
    const equipes = await Equipe.find()
    if(equipes.length <= 0){
      res.status(404).json({ error: 'Aucune équipe n\'a était trouvée'})
    }
    res.json({
      equipes,
    })
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const equipe = await Equipe.findById(id)

    if (!equipe) {
      res.status(404).json({ error: 'Équipe non trouvée' })
      return
    }

    res.json(equipe)
  }

  async getByDresseur(req: Request, res: Response) {
    const { dresseurId } = req.params
    const equipes = await Equipe.find({ dresseurId })

    res.json({
      equipes,
    })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    if (data.pokemons && data.pokemons.length > 6) {
      res.status(400).json({ error: 'Une équipe ne peut pas contenir plus de 6 Pokémon' })
      return
    }

    const equipe = await Equipe.findByIdAndUpdate(id, data, { new: true })

    if (!equipe) {
      res.status(404).json({ error: 'Équipe non trouvée' })
      return
    }

    res.json({
      message: 'Équipe mise à jour avec succès',
      equipe,
    })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const equipe = await Equipe.findByIdAndDelete(id)

    if (!equipe) {
      res.status(404).json({ error: 'Équipe non trouvée' })
      return
    }

    res.json({
      message: 'Équipe supprimée avec succès',
      equipe,
    })
  }
}

export default new EquipeController()
