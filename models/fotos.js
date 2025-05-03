import mongoose from 'mongoose';

const FotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  descripcion: String,
  ubicacion: String,
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Foto || mongoose.model('Foto', FotoSchema);
