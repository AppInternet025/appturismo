// backend/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');

// Rutas
router.route('/')
  .get(getAllLocations)
  .post(createLocation); // Asume que eres admin para POST

router.route('/:id')
  .get(getLocationById)
  .put(updateLocation)    // Asume que eres admin para PUT
  .delete(deleteLocation); // Asume que eres admin para DELETE

module.exports = router;