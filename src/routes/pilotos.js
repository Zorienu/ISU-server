import express from 'express'
import {
   getEstadoPilotos,
   setEstadoPilotos
} from '../controllers/pilotos.js'

const router = express.Router()

router.get('/GetEstadoPilotos', getEstadoPilotos)
router.put('/SetEstadoPilotos', setEstadoPilotos)

export default router