import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (form.password !== form.confirmPassword) {
      setMessage("Las contraseñas deben coincidir");
      return;
    }

    // Limpiar el mensaje de error si todo es correcto
    setMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message); // Mostrar el mensaje de respuesta del servidor
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-xl font-semibold">Registro</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full border p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          className="w-full border p-2 rounded"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
          Registrar
        </button>
        {message && <p className="text-sm text-center text-red-600">{message}</p>} {/* Mostrar error */}
      </form>
    </div>
  );
}

