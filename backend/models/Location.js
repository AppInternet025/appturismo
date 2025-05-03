// backend/models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    photoUrl: { // Usaremos URL para la foto por simplicidad. Podrías cambiarlo para subir archivos.
      type: String,
      required: [true, 'La URL de la foto es obligatoria'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
    },
    ubi_lat: {
      type: Number,
      required: [true, 'La latitud es obligatoria'],
    },
    ubi_lng: {
      type: Number,
      required: [true, 'La longitud es obligatoria'],
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

// Middleware para validar URL simple (puedes hacerlo más robusto)
locationSchema.path('photoUrl').validate((val) => {
    const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'URL de foto inválida.');

// Validar rango de latitud y longitud
locationSchema.path('ubi_lat').validate((val) => {
    return val >= -90 && val <= 90;
}, 'Latitud inválida (debe estar entre -90 y 90).');

locationSchema.path('ubi_lng').validate((val) => {
    return val >= -180 && val <= 180;
}, 'Longitud inválida (debe estar entre -180 y 180).');


module.exports = mongoose.model('Location', locationSchema);