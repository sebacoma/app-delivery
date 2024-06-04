const { Router, request, response } = require("express");
const {createCategory} = require('../controllers/categoryController');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');
const {getCategories} = require('../controllers/categoryController');
const {getCategoryById} = require('../controllers/categoryController');
const {deactivateCategory} = require('../controllers/categoryController');
const {activateCategory} = require('../controllers/categoryController');
const {updateCategory} = require('../controllers/categoryController');

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

router.post("/deactivate-category", [
    check('id', 'the field id is required').notEmpty(), // Verificar si el id está presente en el cuerpo de la solicitud
    validateFields
], deactivateCategory);

router.post("/activate-category", [
    check('id', 'the field id is required').notEmpty(), // Verificar si el id está presente en el cuerpo de la solicitud
    validateFields
], activateCategory);

router.put('/edit-category', [
    check('name', 'the field name is required').not().isEmpty(),
    check('description', 'the field description is required').not().isEmpty(),
    validateFields
], updateCategory);

module.exports = router;