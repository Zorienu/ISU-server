import { db } from '../index.js'
import { Gpio } from 'onoff'

const pinesPuertas = [
   new Gpio(4, 'out'),
   new Gpio(5, 'out'),
   new Gpio(6, 'out'),
]

export const getEstadoPuerta = async (req, res) => {
   try {
      const { id } = req.params
      const idEntero = parseInt(id)

      // obtener puerta (id y pin)
      const puerta = db.get('puertas').find({ id: idEntero }).value()
      console.log(puerta)

      // crear objeto para el pin
      const pinObj = pinesPuertas[idEntero]

      // leer estado del pin
      const estado = pinObj.readSync()


      return res.status(200).json({ ...puerta, estado })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const setEstadoPuerta = async (req, res) => {
   try {
      let { id } = req.params
      const { estado } = req.body
      const idEntero = parseInt(id)

      const puerta = db.get('puertas')
         .find({ id: idEntero })
         .value()

      // crear objeto para el pin
      const pinObj = pinesPuertas[idEntero]
      console.log(estado)
      console.log(pinObj)
      pinObj.writeSync(estado ? 1 : 0)

      // leer el estado del pin
      const newEstado = pinObj.readSync()

      return res.status(200).json({ ...puerta, newEstado })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}