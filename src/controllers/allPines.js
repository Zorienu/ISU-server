import { puertas } from '../index.js'
import { luzUV } from '../index.js'


export const getEstadoAllPines = async (req, res) => {
   try {
      // leer estado todos los pines de las puetas
      const estadoPuertas = []
      puertas.forEach(puerta => {
         estadoPuertas.push(puerta.pin.readSync())
      })

      // leer estado pin luz uv
      const estadoLuzUV = luzUV.pin.readSync()

      return res.status(200).json({
         estadoPuertas,
         estadoLuzUV
      })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}