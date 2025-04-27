import { useState } from "react";
import { useRouter } from "next/router"; // Importa useRouter

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const router = useRouter(); // Usamos el hook useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await res.json();
      setSuccessMessage(data.message);
      setError("");
      setEmail("");
      setPassword("");
      
      // Redirigir al usuario a la página principal (por ejemplo, "/dashboard")
      router.push("/dashboard");  // Aquí va la URL de la página principal
      
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Iniciar sesión</h2>
        
        {/* Mostrar el mensaje de error */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* Mostrar el mensaje de éxito */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>¿No tienes cuenta? <a href="#" className="text-blue-500 hover:underline">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}
