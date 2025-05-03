// frontend/pages/edit/[id].js
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LocationForm from '../components/LocationForm'; // Ajusta la ruta si usaste un alias diferente
import Link from 'next/link';

const EditLocationPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID de la URL
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return; // No hacer nada si el ID no está listo
      setLoading(true);
      setError('');
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          throw new Error("La URL de la API no está configurada.");
        }
        const { data } = await axios.get(`${apiUrl}/locations/${id}`);
        setLocation(data);
      } catch (err) {
        console.error('Error al cargar el lugar:', err);
        setError(err.response?.data?.message || err.message || 'No se pudo cargar la información del lugar.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]); // Ejecutar cuando el 'id' cambie

  const handleUpdateLocation = async (formData) => {
     setSubmitError(''); // Limpiar error previo
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
       if (!apiUrl) {
         throw new Error("La URL de la API no está configurada.");
       }
      await axios.put(`${apiUrl}/locations/${id}`, formData);
      // Redirigir a la página principal después de editar
      router.push('/');
    } catch (error) {
      console.error('Error al actualizar el lugar:', error);
       // Propagar el error para que el formulario lo muestre
       const errorMessage = error.response?.data?.message || error.message || 'No se pudo actualizar el lugar.';
       setSubmitError(errorMessage); // Guarda el error para mostrarlo
       throw new Error(errorMessage); // Lanza el error para que el form lo atrape
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!location) return <p className="text-center mt-10">Lugar no encontrado.</p>; // Si no hay error pero tampoco lugar

  return (
    <div className="container mx-auto p-4">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Lugar: {location.name}</h1>
         <Link href="/" className="btn btn-secondary">
            Volver al Listado
        </Link>
      </div>
       {submitError && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{submitError}</p>}
      <LocationForm
        onSubmit={handleUpdateLocation}
        initialData={location}
        isEditing={true}
      />
    </div>
  );
};

export default EditLocationPage;