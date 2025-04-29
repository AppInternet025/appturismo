import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await connectToDatabase();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

  res.status(200).json({ message: "Login exitoso" });

  console.log(`El usuario ${email} se ha logueado correctamente`);

  res.status(200).json({ message: "Login exitoso" });
}

