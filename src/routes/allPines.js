import express from 'express'
import {
   getEstadoAllPines,
} from '../controllers/allPines.js'

const router = express.Router()

router.get('/getEstadoAllPines', getEstadoAllPines)

export default router