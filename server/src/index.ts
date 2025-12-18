import 'dotenv/config'
import { Request, Response } from 'express'
import { app, PORT } from './config/server'
import { connectDB } from './utils/mongodb'

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Serveur Express avec TypeScript fonctionne !' })
})

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`)
    })
  } catch (error) {
    console.error('Erreur sur le démarrage du serveur:', error)
    process.exit(1)
  }
}

startServer()
