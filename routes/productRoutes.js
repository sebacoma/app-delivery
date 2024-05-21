const { Router, request, response } = require("express");
const {createProduct} = require('../controllers/productController');
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



module.exports = router;