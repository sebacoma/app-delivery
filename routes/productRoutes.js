const { Router, request, response } = require("express");
const {createProduct, editProduct} = require('../controllers/productController');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');



const router = Router();

router.post('/create-product', [
    check('name', 'the field name is required').not().isEmpty(),
    check('description', 'the field description is required').not().isEmpty(),
    check('price', 'the field description is required').not().isEmpty(),
    check('category_id', 'the field id is required').notEmpty(),
    validateFields
], createProduct);

router.put('/edit-product/:id', [
    check('name', 'El campo nombre es obligatorio').optional().not().isEmpty(),
    check('description', 'El campo descripción es obligatorio').optional().not().isEmpty(),
    check('price', 'El campo precio debe ser un número entero positivo').optional().isInt({ gt: 0 }),
    check('category_id', 'El campo categoría es obligatorio').optional().notEmpty(),
    validateFields
], editProduct);



module.exports = router;