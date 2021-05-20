import express from 'express'
import {
   hacerSecuencia
} from '../controllers/secuencia.js'

const router = express.Router()

router.get('/hacerSecuencia', hacerSecuencia)

export default router