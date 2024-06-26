// usersRoutes.js
const { Router } = require("express");
const { check } = require("express-validator");
const { changePassword } = require("../controllers/usersController");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const {updateProfile } = require("../controllers/usersController")
const {saveAddress} = require("../controllers/usersController")

const router = Router();

// Endpoint para cambiar la contraseña
router.post('/change-password',[
    validateJWT, // Middleware para validar el token JWT
    check('oldPassword', 'La contraseña antigua es requerida').not().isEmpty(),
    check('newPassword', 'La nueva contraseña es requerida').not().isEmpty(),
    validateFields
], changePassword);


router.put('/update-profile',[
    validateJWT, // Verificar el token antes de permitir el acceso
    check('name', 'the field name is required').not().isEmpty(),
    check('lastName', 'the field lastName is required').not().isEmpty(),
    check('phone', 'the field phone is required').not().isEmpty(), // Asumiendo que quieres actualizar el teléfono también
    validateFields
], updateProfile);

router.post('/save-address',[
    // validateJWT, 
], saveAddress)

module.exports = router;