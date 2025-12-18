import cors from 'cors'
import express from 'express'

/**
 * Configuration de base de express
 */
export const app = express()
export const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
