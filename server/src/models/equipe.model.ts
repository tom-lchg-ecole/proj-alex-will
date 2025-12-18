import mongoose, { Schema, Document } from 'mongoose'

export interface IEquipe extends Document {
  name: String
  pokemons: []
  dresseurId: String
  createdAt: Date
}

const EquipeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pokemons: {
      type: [String],
      required: true
    },
    dresseurId: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
    collection: 'Equipe',
  }
)

export const Equipe = mongoose.model<IEquipe>('Equipe', EquipeSchema)
