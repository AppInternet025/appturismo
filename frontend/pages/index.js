// frontend/pages/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; // Usar Image de Next.js si las URL son externas y conocidas
import MapDisplay from '../components/MapDisplay'; // Ajusta la ruta si usaste un alias diferente

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchLocations = async () => {
    setLoading(true);
    setError('');
    try {
      if (!apiUrl) {
        throw new Error("La URL de la API no está configurada.");
      }
      const { data } = await axios.get(`${apiUrl}/locations`);
      setLocations(data);
    } catch (err) {
      console.error('Error al cargar los lugares:', err);
      setError(err.response?.data?.message || err.message || 'No se pudieron cargar los lugares.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []); // Ejecutar solo al montar el componente

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
      try {
        if (!apiUrl) {
          throw new Error("La URL de la API no está configurada.");
        }
        await axios.delete(`${apiUrl}/locations/${id}`);
        // Refrescar la lista después de eliminar
        fetchLocations();
        // Alternativa: filtrar el estado localmente para respuesta más rápida
        // setLocations(locations.filter(loc => loc._id !== id));
      } catch (err) {
        console.error('Error al eliminar el lugar:', err);
        alert(err.response?.data?.message || err.message || 'No se pudo eliminar el lugar.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administración de Lugares</h1>
        <Link href="/add" legacyBehavior>
          <a className="btn btn-primary">Agregar Nuevo Lugar</a>
        </Link>
      </div>

      {/* Mostrar Mapa */}
       <div className="mb-8">
         <h2 className="text-2xl font-semibold mb-4">Mapa de Lugares</h2>
         <div className="bg-white p-1 rounded shadow">
           <MapDisplay locations={locations} />
          </div>
       </div>

      {/* Mostrar Tabla de Lugares */}
      <h2 className="text-2xl font-semibold mb-4">Listado de Lugares</h2>
      {loading && <p>Cargando lugares...</p>}
      {error && <p className="text-red-500 bg-red-100 p-3 rounded">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitud</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitud</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No hay lugares registrados.
                  </td>
                </tr>
              ) : (
                locations.map((location) => (
                  <tr key={location._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                       {/* Usar un placeholder si la imagen no carga o es inválida */}
                       <Image
                        src={location.photoUrl || '/placeholder-image.png'} // Ten una imagen placeholder en public/
                        alt={location.name}
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src='/placeholder-image.png'; }} // Fallback
                        unoptimized={true} // Si son muchas imágenes externas, puede ser útil
                       />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs truncate" title={location.description}>
                      {location.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.ubi_lat.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{location.ubi_lng.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link href={`/edit/${location._id}`} legacyBehavior>
                        <a className="text-indigo-600 hover:text-indigo-900">Editar</a>
                      </Link>
                      <button
                        onClick={() => handleDelete(location._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;