import mongoose, { Schema, Document } from 'mongoose'
import { IPokemon } from '../types/pokemon.type'

export interface IDresseur extends Document {
  username: string
  email: string
  password: string
  pokedex: IPokemon[]
  createdAt: Date
}


const DresseurSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    pokedex: {
      type: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        types: { type: [String], required: true }
      }],
      default:[]
    }

  },
  {
    timestamps: true,
    collection: 'Dresseur',
  }
)

export const Dresseur = mongoose.model<IDresseur>('Dresseur', DresseurSchema)
