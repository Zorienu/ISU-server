import express from 'express'
import cors from 'cors'
import lowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import bodyParser from 'body-parser'

import puertasRoutes from './routes/puertas.js'
import luzUVRoutes from './routes/luzUV.js'

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

app.listen(PORT, () => console.log('listening on port 4000'))