import express from 'express'
import cors from 'cors'
import lowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import bodyParser from 'body-parser'
import { Gpio } from 'onoff'

import puertasRoutes from './routes/puertas.js'
import luzUVRoutes from './routes/luzUV.js'
import pilotosRoutes from './routes/pilotos.js'

export const db = lowDb(new FileSync('db.json'))

db.defaults({
   puertas: [
      { id: 0, pin: 4 },
      { id: 1, pin: 5 },
      { id: 2, pin: 6 }
   ],
   luzuv: { id: 1, pin: 7 }
}).write()

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/puertas', puertasRoutes)
app.use('/luzuv', luzUVRoutes)
app.use('/pilotos', pilotosRoutes)

const PORT = 4000

// var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
// var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

// function blinkLED() { //function to start blinking
//    if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//       LED.writeSync(1); //set pin state to 1 (turn LED on)
//    } else {
//       LED.writeSync(0); //set pin state to 0 (turn LED off)
//    }
// }

// function endBlink() { //function to stop blinking
//    clearInterval(blinkInterval); // Stop blink intervals
//    LED.writeSync(0); // Turn LED off
//    LED.unexport(); // Unexport GPIO to free resources
// }

// setTimeout(endBlink, 5000); //stop blinking after 5 seconds

// inicializar puertas
const infoPuertas = db.get('puertas').value()
export const puertas = []
for (let i in infoPuertas) {
   const { id, pin, ledActivo, ledInactivo } = infoPuertas[i]
   const pines = {
      id,
      pin: new Gpio(pin, 'out'),
      ledActivo: new Gpio(ledActivo, 'out'),
      ledInactivo: new Gpio(ledInactivo, 'out'),
   }
   puertas.push(pines)
}

// inicializar Luz uv
const infoLuzUV = db.get('luzuv').value()
const { id, pin, ledActivo, ledInactivo } = infoLuzUV
export const luzUV = {
   id,
   pin: new Gpio(pin, 'out'),
   ledActivo: new Gpio(ledActivo, 'out'),
   ledInactivo: new Gpio(ledInactivo, 'out'),
}

// inicializar pilotos tapabocas
const infoPilotos = db.get('pilotos').value()
const { conTapabocas, sinTapabocas } = infoPilotos
export const pilotos = {
   conTapabocas: new Gpio(conTapabocas, 'out'),
   sinTapabocas: new Gpio(sinTapabocas, 'out'),
}

// Configuración inicial pines
puertas.forEach(puerta => {
   const { pin, ledActivo, ledInactivo } = puerta
   pin.writeSync(0)
   ledActivo.writeSync(0)
   ledInactivo.writeSync(1)
})

const { pin: pinluzuv, ledActivo: ledActivoluzuv, ledInactivo: ledInactivoluzuv } = luzUV
pinluzuv.writeSync(0)
ledActivoluzuv.writeSync(0)
ledInactivoluzuv.writeSync(1)

pilotos.conTapabocas.writeSync(0)
pilotos.sinTapabocas.writeSync(0)






app.listen(PORT, () => console.log('listening on port 4000'))