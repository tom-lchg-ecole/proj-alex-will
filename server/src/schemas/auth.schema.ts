import { Schema } from 'mongoose'

/**
 * Schéma de validation Mongoose pour les données de connexion (sign-in)
 * Valide: username, email, password
 */
export const signUnSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est requis"],
      trim: true,
      minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"],
      maxlength: [50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir un email valide'],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    },
  },
  {
    strict: true, // Rejette les champs non définis dans le schéma
  }
)
