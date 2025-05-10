"use client";

import { signIn } from "next-auth/react";

function DashborPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Metodos De Acceso</h1>
      </header>
      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <form className="space-y-4">
          <button
            type="button"
            onClick={() => alert("Acceso local no implementado aún")}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Acceso Local
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Google
          </button>
        </form>
      </main>
    </div>
  );
}

export default DashborPage;
