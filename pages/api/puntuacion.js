import dbConnect from '@/lib/mongodb';
import Puntuacion from '@/models/Puntuacion';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { usuarioId, fotoId, comentario, puntuacion } = req.body;

    if (!usuarioId || !fotoId || !puntuacion) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    try {
      const nuevaPuntuacion = await Puntuacion.create({
        usuarioId,
        fotoId,
        comentario,
        puntuacion
      });

      res.status(201).json(nuevaPuntuacion);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al guardar la puntuación', error: error.message });
    }
  } else {
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}