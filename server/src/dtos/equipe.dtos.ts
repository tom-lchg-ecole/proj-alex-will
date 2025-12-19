import Joi from 'joi'

// Schéma de validation pour un Pokémon
const pokemonSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(1).required(),
  image: Joi.string().uri().required(),
  types: Joi.array().items(Joi.string()).min(1).required(),
})

export const createEquipeSchema = Joi.object({
  name: Joi.string().min(1).required(),
  pokemons: Joi.array().items(pokemonSchema).min(1).max(6).required(),
})

// Schéma de validation pour update une équipe
export const updateEquipeSchema = Joi.object({
  name: Joi.string().min(1).required(),
  pokemons: Joi.array().items(pokemonSchema).min(1).max(6).required(),
})

export const deleteEquipeSchema = Joi.object({
  id: Joi.string().hex().required(), 
})