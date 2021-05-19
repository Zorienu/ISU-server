import { puertas } from '../index.js'


export const getEstadoPuerta = async (req, res) => {
   try {
      const { id: idPuerta } = req.params
      const idPuertaEntero = parseInt(idPuerta)

      if (idPuertaEntero >= puertas.length)
         res.status(404).json({ message: "puerta no existe" })

      // obtener puerta (pin del relé, pin led activo, pin led inactivo)
      const { id, pin, ledActivo, ledInactivo } = puertas[idPuertaEntero]

      // leer estado del pin
      const estadoPin = pin.readSync()

      // leer estado del pin led activo
      const estadoLedActivo = ledActivo.readSync()

      // leer estado del pin led inactivo
      const estadoLedInactivo = ledInactivo.readSync()


      return res.status(200).json({
         id,
         estadoPin,
         estadoLedActivo,
         estadoLedInactivo
      })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const setEstadoPuerta = async (req, res) => {
   try {
      let { id: idPuerta } = req.params
      const { estado: estadoPuerta } = req.body
      const idPuertaEntero = parseInt(idPuerta)
      const estadoPuertaEntero = parseInt(estadoPuerta)

      if (idPuertaEntero >= puertas.length)
         res.status(404).json({ message: "puerta no existe" })

      const { id, pin, ledActivo, ledInactivo } = puertas[idPuertaEntero]

      // establecer estado pin
      pin.writeSync(estadoPuertaEntero)

      // establecer estado led activo
      ledActivo.writeSync(estadoPuertaEntero)

      // establecer estado led inactivo
      ledInactivo.writeSync(1 - estadoPuertaEntero)

      // leer estado del pin
      const estadoPin = pin.readSync()

      // leer estado del pin led activo
      const estadoLedActivo = ledActivo.readSync()

      // leer estado del pin led inactivo
      const estadoLedInactivo = ledInactivo.readSync()


      return res.status(200).json({
         id,
         estadoPin,
         estadoLedActivo,
         estadoLedInactivo
      })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}