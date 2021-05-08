import { db } from '../index.js'

export const getEstadoPuerta = async (req, res) => {
   try {
      const { id: idPuerta } = req.params

      const puerta = db.get('puertas').find({ id: parseInt(idPuerta) }).value()
      return res.status(200).json(puerta)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const setEstadoPuerta = async (req, res) => {
   try {
      let { id: idPuerta } = req.params
      const { estado } = req.body
      idPuerta = parseInt(idPuerta)

      const puerta = db.get('puertas')
         .find({ id: idPuerta })
         .assign({ estado })
         .value()
      return res.status(200).json(puerta)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}