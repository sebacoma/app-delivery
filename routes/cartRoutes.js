const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Ejemplo de ruta POST
router.post('/:userId', cartController.addToCart);

module.exports = router;