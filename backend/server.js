// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const locationRoutes = require('./routes/locationRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS para permitir peticiones del frontend
app.use(express.json()); // Para parsear application/json

// Rutas de la API
app.get('/', (req, res) => { // Ruta de prueba
  res.send('API de Lugares funcionando...');
});
app.use('/api/locations', locationRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Stack trace solo en desarrollo
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));