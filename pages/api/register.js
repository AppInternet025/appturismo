import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs"; // Usamos bcrypt para encriptar la contraseña

export default async function handler(req, res) {
  // Aseguramos que solo se acepte el método POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // Conexión a la base de datos
    await connectToDatabase();

    // Obtenemos los datos del cuerpo de la petición
    const { username, email, password, confirmPassword } = req.body;

    // Validación de los campos
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificación de que las contraseñas coinciden
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas deben coincidir" });
    }

    // Comprobamos si el usuario ya existe en la base de datos
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si todo está bien, creamos el nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword });

    // Guardamos el usuario en la base de datos
    await newUser.save();

    // Respondemos con éxito
    return res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    // En caso de error, lo registramos en la consola y devolvemos un error genérico
    console.error("🔥 Error en /api/register:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}


