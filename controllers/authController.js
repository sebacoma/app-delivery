const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const {generateToken}  = require('../helpers/generate-jwt');
const jwt = require('jsonwebtoken');


const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        // Validate exists email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: 'Invalidate credentials.'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(400).send({
                error: true,
                message: 'Invalidate credentials. - password'
            });
        }
        const token = await generateToken(user.id);
        
        const { name, lastName, phone, email: emailUser, image, role_id } = user;

        const dataUser = { id: user.id, name, lastName, phone, email: emailUser, image, role_id };
        dataUser.session_token = token;


        return res.status(201).json({
            success: true,
            data: dataUser
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: true,
            message: error.message
        });
    }
}

module.exports = {
    login
}