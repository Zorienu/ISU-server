import { pilotos } from '../index.js'
import { exec } from 'child_process'

const estados = {
   rojo: {
      conTapabocas: 0,
      sinTapabocas: 1
   },
   verde: {
      conTapabocas: 1,
      sinTapabocas: 0
   },
   ninguno: {
      conTapabocas: 0,
      sinTapabocas: 0
   }
}

export const getEstadoPilotos = async (req, res) => {
   try {
      const { conTapabocas, sinTapabocas } = pilotos

      // obtener estado piloto con tapabocas
      const estadoPilotoConTapabocas = conTapabocas.readSync()

      // obtener estado piloto sin tapabocas
      const estadoPilotoSinTapabocas = sinTapabocas.readSync()

      res.status(200).json({
         estadoPilotoConTapabocas,
         estadoPilotoSinTapabocas
      })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const setEstadoPilotos = async (req, res) => {
   try {
      const { estado } = req.body
      const modo = estados[estado]
      const { conTapabocas, sinTapabocas } = pilotos

      if (modo.sinTapabocas === 1)
         exec('mplayer ~/Desktop/Jhan/audio.mp3', (err, stdout, stderr) => {
            if (err) console.log(err)
         })

      // establecer estado piloto con tapabocas
      conTapabocas.writeSync(modo.conTapabocas)


      // establecer estado piloto sin tapabocas
      sinTapabocas.writeSync(modo.sinTapabocas)

      // obtener estado piloto sin tapabocas
      const estadoPilotoSinTapabocas = sinTapabocas.readSync()
      // obtener estado piloto con tapabocas
      const estadoPilotoConTapabocas = conTapabocas.readSync()

      res.status(200).json({
         estadoPilotoConTapabocas,
         estadoPilotoSinTapabocas
      })

   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

