import express from 'express'
import {
   getEstadoLuzUV,
   setEstadoLuzUV
} from '../controllers/luzUV.js'

const router = express.Router()

router.get('/getEstadoLuzUV', getEstadoLuzUV)
router.put('/setEstadoLuzUV', setEstadoLuzUV)

export default router