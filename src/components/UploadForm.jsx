import React, { useState } from 'react';

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        setMessage('Solo se permiten archivos de imagen (.jpg, .jpeg, .png)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('La imagen es demasiado pesada. Máximo 5MB por archivo.');
        return;
      }
      validImages.push(file);
    });

    if (validImages.length === 0) {
      setMessage('No hay archivos válidos para subir.');
    } else {
      setImages(validImages);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setMessage('Selecciona al menos una imagen válida para subir.');
      return;
    }

    try {
      const urls = [];

      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append('file', images[i]);
        formData.append('upload_preset', 'hxlmnpnj');

        const res = await fetch('https://api.cloudinary.com/v1_1/drzxn88tz/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        urls.push(data.secure_url);
      }

      setMessage(`Fotos subidas correctamente: ${urls.length}`);
    } catch (error) {
      setMessage('Error al subir imágenes.');
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Subir fotos
      </button>
      <p className="mt-2 text-red-500">{message}</p>
    </div>
  );
};

export default UploadForm;
