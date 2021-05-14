import { db } from '../index.js'


export const getEstadoLuzUV = async (req, res) => {
   try {
      const { idLuzUV } = req.params

      const data = db.get('luzuv').value()
      return res.status(200).json(data)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const setEstadoLuzUV = async (req, res) => {
   try {
      const { idLuzUV } = req.params
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}