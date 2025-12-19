import Joi from 'joi'

export const deleteEquipeSchema = Joi.object({
  id: Joi.string().hex().required(), 
})