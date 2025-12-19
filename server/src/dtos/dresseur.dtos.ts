import Joi from 'joi'

export const updatePokedexSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': "L'ID doit être un identifiant MongoDB valide",
    'string.length': "L'ID doit contenir 24 caractères",
    'any.required': "L'ID est requis",
  }),
  pokedex: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        image: Joi.string().uri().required(),
        types: Joi.array().items(Joi.string()).required(),
      })
    )
    .required()
    .messages({
      'array.base': 'Le pokedex doit être un tableau',
      'any.required': 'Le pokedex est requis',
    }),
})

export const deleteDresseurSchema = Joi.object({
  id: Joi.string().hex().required(),
})