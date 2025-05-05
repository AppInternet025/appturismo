// src/lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor define la variable de entorno MONGODB_URI dentro de .env.local'
  );
}

/**
 * Cache global de la conexión a la base de datos. Esto permite que la conexión
 * sea reutilizada entre invocaciones de funciones serverless (API Routes),
 * en lugar de abrir una nueva conexión cada vez.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // console.log('=> Usando conexión de DB cacheada');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Deshabilita el buffer si la conexión tarda
      // useNewUrlParser: true, // No necesario en Mongoose 6+
      // useUnifiedTopology: true, // No necesario en Mongoose 6+
    };

    // console.log('=> Creando NUEVA conexión a DB');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB Conectado!");
      return mongooseInstance;
    }).catch(error => {
       console.error("Error conectando a MongoDB:", error);
       // Limpiar la promesa cacheada en caso de error para permitir reintentos
       cached.promise = null;
       throw error; // Re-lanzar el error para que la API route falle
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Limpiar promesa en error
    throw e; // Re-lanzar
  }

  return cached.conn;
}

export default dbConnect;