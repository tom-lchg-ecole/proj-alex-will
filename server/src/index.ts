import { Request, Response } from 'express'
import { app, PORT } from './config/server'
import { pokemonRoutes } from './routes/pokemon.routes';


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Serveur Express avec TypeScript fonctionne !' })
})

app.use('/api', pokemonRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})
