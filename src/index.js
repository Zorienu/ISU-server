import express from 'express'
import cors from 'cors'
import lowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import bodyParser from 'body-parser'

import puertasRoutes from './routes/puertas.js'
import luzUVRoutes from './routes/luzUV.js'

export const db = lowDb(new FileSync('db.json'))

db.defaults({
   puertas: [
      { id: 1, pin: 'gpio-1', estado: true },
      { id: 2, pin: 'gpio-2', estado: false },
      { id: 3, pin: 'gpio-3', estado: true }
   ],
   luzuv: { id: 1, pin: 'gpio-4', estado: false }
}).write()

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/puertas', puertasRoutes)
app.use('/luzuv', luzUVRoutes)

const PORT = 4000

app.listen(PORT, () => console.log('listening on port 4000'))