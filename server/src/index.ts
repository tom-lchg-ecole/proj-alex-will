import 'dotenv/config'
import { Request, Response } from 'express'
import { app, PORT } from './config/server'
import { authRoute } from './routes/auth.route'
import { pokemonRoutes } from './routes/pokemon.routes'
import { connectDB } from './utils/mongodb'

app.use('/auth', authRoute)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Serveur Express avec TypeScript fonctionne !' })
})

app.use('/api', pokemonRoutes)

app.listen(PORT, async () => {
  try {
    await connectDB()
    console.log('✅ Connexion à la base de données réussie')
    console.log(`🚀 Serveur démarré sur le port ${PORT}`)
  } catch (error) {
    console.error('❌ Échec de connexion à la base de données:', error)
  }
})
