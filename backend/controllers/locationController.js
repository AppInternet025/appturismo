// backend/controllers/locationController.js
const Location = require('../models/Location');

// @desc    Obtener todos los lugares
// @route   GET /api/locations
// @access  Public (o podrías añadir auth después)
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error del servidor al obtener lugares' });
  }
};

// @desc    Obtener un lugar por ID
// @route   GET /api/locations/:id
// @access  Public
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Lugar no encontrado' });
    }
  } catch (error) {
     console.error(`Error fetching location ${req.params.id}:`, error);
     if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Lugar no encontrado (ID inválido)' });
     }
    res.status(500).json({ message: 'Error del servidor al obtener el lugar' });
  }
};

// @desc    Crear un nuevo lugar
// @route   POST /api/locations
// @access  Admin (necesitaría auth)
const createLocation = async (req, res) => {
  const { name, photoUrl, description, ubi_lat, ubi_lng } = req.body;

  try {
    const location = new Location({
      name,
      photoUrl,
      description,
      ubi_lat: parseFloat(ubi_lat), // Asegurarse que sean números
      ubi_lng: parseFloat(ubi_lng),
    });

    const createdLocation = await location.save();
    res.status(201).json(createdLocation);
  } catch (error) {
    console.error('Error creating location:', error);
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: 'Datos inválidos', errors: messages });
    }
    res.status(500).json({ message: 'Error del servidor al crear el lugar' });
  }
};

// @desc    Actualizar un lugar
// @route   PUT /api/locations/:id
// @access  Admin
const updateLocation = async (req, res) => {
  const { name, photoUrl, description, ubi_lat, ubi_lng } = req.body;

  try {
    const location = await Location.findById(req.params.id);

    if (location) {
      location.name = name || location.name;
      location.photoUrl = photoUrl || location.photoUrl;
      location.description = description || location.description;
      location.ubi_lat = ubi_lat !== undefined ? parseFloat(ubi_lat) : location.ubi_lat;
      location.ubi_lng = ubi_lng !== undefined ? parseFloat(ubi_lng) : location.ubi_lng;

      const updatedLocation = await location.save();
      res.json(updatedLocation);
    } else {
      res.status(404).json({ message: 'Lugar no encontrado' });
    }
  } catch (error) {
    console.error(`Error updating location ${req.params.id}:`, error);
     if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Lugar no encontrado (ID inválido)' });
     }
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: 'Datos inválidos', errors: messages });
    }
    res.status(500).json({ message: 'Error del servidor al actualizar el lugar' });
  }
};

// @desc    Eliminar un lugar
// @route   DELETE /api/locations/:id
// @access  Admin
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (location) {
      await location.deleteOne(); // o location.remove() en versiones antiguas de Mongoose
      res.json({ message: 'Lugar eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Lugar no encontrado' });
    }
  } catch (error) {
    console.error(`Error deleting location ${req.params.id}:`, error);
     if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Lugar no encontrado (ID inválido)' });
     }
    res.status(500).json({ message: 'Error del servidor al eliminar el lugar' });
  }
};


module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
};