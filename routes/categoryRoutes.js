const { Router, request, response } = require("express");
const {createCategory} = require('../controllers/categoryController');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');
const {getCategories} = require('../controllers/categoryController');
const {getCategoryById} = require('../controllers/categoryController');
const {DesactiveCategory} = require('../controllers/categoryController');
const {ActiveCategory} = require('../controllers/categoryController');
const {UpdateCategory} = require('../controllers/categoryController');

const router = Router();

router.post('/create-category', [
    check('name', 'the field name is required').not().isEmpty(),
    check('description', 'the field description is required').not().isEmpty(),
    validateFields
], createCategory);

router.get('/get-categories', getCategories);

router.get('/get-category', [
    check('id', 'the field id is required').notEmpty(), // Verificar si el id está presente en el cuerpo de la solicitud
    validateFields
], getCategoryById);

router.post("/Deactivate-Category", [
    check('id', 'the field id is required').notEmpty(), // Verificar si el id está presente en el cuerpo de la solicitud
    validateFields
], DesactiveCategory);

router.post("/Active-Category", [
    check('id', 'the field id is required').notEmpty(), // Verificar si el id está presente en el cuerpo de la solicitud
    validateFields
], ActiveCategory);

router.put('/editar-categoria', [
    check('name', 'the field name is required').not().isEmpty(),
    check('description', 'the field description is required').not().isEmpty(),
    validateFields
], UpdateCategory);

module.exports = router;