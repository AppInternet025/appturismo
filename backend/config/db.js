// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Asegura que las variables de .env estén cargadas

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex y useFindAndModify ya no son necesarios en Mongoose 6+
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error conectando a MongoDB: ${error.message}`);
    process.exit(1); // Salir del proceso con fallo
  }
};

module.exports = connectDB;