const { Router } = require("express");
const {saveAddress} = require('../controllers/addressController');
const {getAddresses} = require('../controllers/addressController');
// Endpoint para obtener una dirección por userId
const router = Router();
// Endpoint para guardar o actualizar una dirección
router.post('/save', saveAddress);

router.get('/:userId', getAddresses);

module.exports = router;