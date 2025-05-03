import mongoose from 'mongoose';

const PuntuacionSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fotoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Foto',
    required: true
  },
  comentario: {
    type: String,
    required: false 
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Puntuacion || mongoose.model('Puntuacion', PuntuacionSchema);
