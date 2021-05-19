import { luzUV } from '../index.js'


export const getEstadoLuzUV = async (req, res) => {
   try {
      const { id, pin, ledActivo, ledInactivo } = luzUV

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

export const setEstadoLuzUV = async (req, res) => {
   try {
      const { estado } = req.body
      const estadoEntero = parseInt(estado)
      const { id, pin, ledActivo, ledInactivo } = luzUV

      // establecer el estado de la luz uv
      pin.writeSync(estadoEntero)

      // establecer estado led activo
      ledActivo.writeSync(estadoEntero)

      // establecer estado led inactivo
      ledInactivo.writeSync(1 - estadoEntero)

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