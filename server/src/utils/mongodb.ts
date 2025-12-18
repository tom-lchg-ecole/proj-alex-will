import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/proj-alex-will'

    await mongoose.connect(mongoUri)

    console.log('Connexion à MongoDB réussie avec ' + mongoUri)
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error)
    process.exit(1)
  }
}
