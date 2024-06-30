const { Router } = require("express");
const { createProduct, editProduct, getProductsByCategory, getProductById, deactivateProduct } = require('../controllers/productController');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const { validateToken } = require("../controllers/authController");

const router = Router();

router.post('/create-product/:category_id', [
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    check('description', 'El campo descripción es obligatorio').not().isEmpty(),
    check('price', 'El campo precio es obligatorio').not().isEmpty(),
    check('category_id', 'El campo categoría es obligatorio').notEmpty(),
    validateFields
], createProduct);

router.put('/edit-product/:id', [
    check('name', 'El campo nombre es obligatorio').optional().not().isEmpty(),
    check('description', 'El campo descripción es obligatorio').optional().not().isEmpty(),
    check('price', 'El campo precio debe ser un número entero positivo').optional().isInt({ gt: 0 }),
    check('category_id', 'El campo categoría es obligatorio').optional().notEmpty(),
    validateFields
], editProduct);

router.get('/get-products-category/:category_id', getProductsByCategory);
router.get('/get-product/:id', getProductById);
router.patch('/deactivate/:id', [
    check('id', 'El campo id es obligatorio').notEmpty(),
], deactivateProduct);

module.exports = router;
