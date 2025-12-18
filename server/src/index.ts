import { Request, Response } from 'express'
import { app, PORT } from './config/server'

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Serveur Express avec TypeScript fonctionne !' })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})
