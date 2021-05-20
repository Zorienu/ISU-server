import { puertas } from '../index.js'
import { luzUV } from '../index.js'
import { pilotos } from '../index.js'

const activar = (pines) => {
   pines.pin.writeSync(1)
   pines.ledActivo.writeSync(1)
   pines.ledInactivo.writeSync(0)
}

const desactivar = (pines) => {
   pines.pin.writeSync(0)
   pines.ledActivo.writeSync(0)
   pines.ledInactivo.writeSync(1)
}

export const hacerSecuencia = async (req, res) => {
   try {
      // encender piloto verde
      pilotos.conTapabocas.writeSync(1)
      // encender puerta 0
      activar(puertas[0])

      setTimeout(() => {
         // apagar puerta 0
         desactivar(puertas[0])
         // apagar piloto verde
         pilotos.conTapabocas.writeSync(0)
         // encender luz uv
         activar(luzUV)

         setTimeout(() => {
            // apagar luz uv
            desactivar(luzUV)
            // encender puerta 1
            activar(puertas[1])

            setTimeout(() => {
               // apagar puerta 1
               desactivar(puertas[1])
            }, 5000)
         }, 5000)
      }, 5000)

      res.status(200).json({ message: "done" })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}