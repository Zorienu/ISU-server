import express from 'express'
import {
   getEstadoLuzUV,
   setEstadoLuzUV
} from '../controllers/luzUV.js'

const router = express.Router()

router.get('/EstadoLuzUV/:id', getEstadoLuzUV)
router.post('/EstadoLuzUV/:id', setEstadoLuzUV)

export default router