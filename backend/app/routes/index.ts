import express, {Application} from 'express'
import abilitiesRoutes from './abilitiesRoutes'
import classesRoutes from './classesRoutes'
import groupsRoutes from './groupsRoutes'
import movesRoutes from './movesRoutes'
import pokemonRoutes from './pokemonRoutes'
import typesRoutes from './typesRoutes'
import authRoutes from './authRoutes'
import {verifyToken} from '../middlewares/verifyToken'

const app: Application = express()

app.use('/api/abilities', abilitiesRoutes)
app.use('/api/classes', classesRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/moves', movesRoutes)
app.use('/api/pokemon', pokemonRoutes)
app.use('/api/types', typesRoutes)
app.use('/api/auth', authRoutes)

module.exports = app