const { Router, request, response } = require("express");
const {login} = require('../controllers/authController');
const {verifyEmailLogin} = require('../helpers/verify-email');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');


const router = Router();



router.post('/login', [
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmailLogin),
    check('password', 'the field password is required').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('name', 'the field name is required').not().isEmpty(),
    check('lastName', 'the field lastName is required').not().isEmpty(),
    check('email', 'the field email is required').not().isEmpty(),
    check('email', 'this not valid email').isEmail(),
    check('email', 'the field email is required').custom(verifyEmail),
    check('password', 'the field password is required').not().isEmpty(),
    validateFields
], register);


module.exports = router;