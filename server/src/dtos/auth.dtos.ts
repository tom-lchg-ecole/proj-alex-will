import Joi from 'joi'

export const signUpSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': "Le nom d'utilisateur doit être une chaîne de caractères",
    'string.min': "Le nom d'utilisateur doit contenir au moins 3 caractères",
    'any.required': "Le nom d'utilisateur est requis",
    'string.empty': "Le nom d'utilisateur ne peut pas être vide",
  }),
  email: Joi.string().email().required().messages({
    'string.base': "L'email doit être une chaîne de caractères",
    'string.email': "L'email doit être une adresse email valide",
    'any.required': "L'email est requis",
    'string.empty': "L'email ne peut pas être vide",
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Le mot de passe doit être une chaîne de caractères',
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    'any.required': 'Le mot de passe est requis',
    'string.empty': 'Le mot de passe ne peut pas être vide',
  }),
})

export const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': "L'email doit être une chaîne de caractères",
    'string.email': "L'email doit être une adresse email valide",
    'any.required': "L'email est requis",
    'string.empty': "L'email ne peut pas être vide",
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Le mot de passe doit être une chaîne de caractères',
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    'any.required': 'Le mot de passe est requis',
    'string.empty': 'Le mot de passe ne peut pas être vide',
  }),
})
