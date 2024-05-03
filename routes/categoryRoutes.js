const { Router, request, response } = require("express");
const {createCategory} = require('../controllers/categoryController');
const {verifyEmailLogin} = require('../helpers/verify-email');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');
const {getCategories} = require('../controllers/categoryController');

const router = Router();

router.post('/', [
    check('name', 'the field name is required').not().isEmpty(),
    check('description', 'the field description is required').not().isEmpty(),
    check('image', 'the field image is required').not().isEmpty(),
    validateFields
], createCategory);

router.get('/getCategory', getCategories);

module.exports = router;