import mongoose, { Schema, Document } from 'mongoose'

export interface IDresseur extends Document {
  username: string
  email: string
  password: string
  pokedex: string[]
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
      type: [String],
      default:[]
    }

  },
  {
    timestamps: true,
    collection: 'Dresseur',
  }
)

export const Dresseur = mongoose.model<IDresseur>('Dresseur', DresseurSchema)
