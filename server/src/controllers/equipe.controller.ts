import { Request, Response } from 'express'
import { createEquipeSchema, updateEquipeSchema } from '../dtos/equipe.dtos'
import { Equipe } from '../models/equipe.model'

class EquipeController {
  async create(req: Request, res: Response) {
    const { name, pokemons, dresseurId } = req.body

    // Validation avec le schéma Joi
    const { error } = createEquipeSchema.validate({ name, pokemons })
    if (error) {
      res.status(400).json({ error: error.message })
      return
    }

    if (!dresseurId) {
      res.status(400).json({ error: 'Le dresseurId est requis' })
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
    if (equipes.length <= 0) {
      res.status(404).json({ error: "Aucune équipe n'a était trouvée" })
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

    // Validation avec le schéma Joi
    const { error } = updateEquipeSchema.validate(data)
    if (error) {
      res.status(400).json({ error: error.message })
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
