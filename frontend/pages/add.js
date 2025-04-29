// frontend/pages/add.js
import { useRouter } from 'next/router';
import axios from 'axios';
import LocationForm from '../components/LocationForm'; // Ajusta la ruta si usaste un alias diferente
import Link from 'next/link';
import { useState } from 'react';

const AddLocationPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const handleAddLocation = async (formData) => {
    setSubmitError(''); // Limpiar error previo
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("La URL de la API no está configurada.");
      }
      await axios.post(`${apiUrl}/locations`, formData);
      // Si tiene éxito, redirigir a la página principal
      router.push('/');
    } catch (error) {
      console.error('Error al agregar el lugar:', error);
      // Propagar el error para que el formulario lo muestre
      const errorMessage = error.response?.data?.message || error.message || 'No se pudo agregar el lugar.';
       setSubmitError(errorMessage); // Guarda el error para mostrarlo
       throw new Error(errorMessage); // Lanza el error para que el form lo atrape
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agregar Nuevo Lugar</h1>
        <Link href="/" className="btn btn-secondary">
            Volver al Listado
        </Link>
      </div>
      {submitError && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{submitError}</p>}
      <LocationForm onSubmit={handleAddLocation} isEditing={false} />
    </div>
  );
};

export default AddLocationPage;