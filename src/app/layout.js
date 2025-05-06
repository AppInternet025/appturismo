// src/app/layout.js (CORRECTO)
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin de Lugares',
  description: 'Aplicación para administrar lugares en un mapa',
};

export default function RootLayout({ children }) {
  return (
    // Asegúrate de que no haya espacios ni texto aquí antes/después de <body>
    <html lang="es">
      <body className={inter.className}> 
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body> 
    </html>
  );
}