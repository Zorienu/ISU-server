import express from 'express'
import {
   getEstadoPuerta,
   setEstadoPuerta
} from '../controllers/puertas.js'

const router = express.Router()

router.get('/GetEstadoPuerta/:id', getEstadoPuerta)
router.put('/SetEstadoPuerta/:id', setEstadoPuerta)

export default router