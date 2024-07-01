const { response, request } = require("express");
const User = require("../models/user");
const Role = require("../models/role");
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../helpers/generate-jwt');
const jwt = require('jsonwebtoken');

const login = async (req = request, res = response) => {
    try {
        console.log("Login request body:", req.body);
        const { email, password } = req.body;

        // Validate exists email
        const user = await User.findOne({ where: { email } });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalidate credentials.'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        console.log("Password validation:", validPassword);

        if (!validPassword) {
            return res.status(400).send({
                success: false,
                error: true,
                message: 'Invalidate credentials. - password'
            });
        }

        console.log("Generating token for user ID:", user.id);
        const token = await generateToken(user.id);
        console.log("Token generated:", token);

        const { name, lastName, phone, email: emailUser, image, role_id } = user;
        const dataUser = { id: user.id, name, lastName, phone, email: emailUser, image, role_id, session_token: token };

        console.log("Data to be returned:", dataUser);

        return res.status(201).json({
            success: true,
            data: dataUser
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send({
            success: false,
            error: true,
            message: error.message
        });
    }
}

const register = async (req = request, res = response) => {
    try {
        console.log("Register request body:", req.body);
        const { name: nameReq, lastName: lastNameReq, email: emailReq, password: passwordReq, phone: phoneReq } = req.body;

        // Get to client role
        const role = await Role.findOne({ where: { name: 'CLIENTE' } });
        console.log("Role found:", role);

        if (!role) {
            throw new Error('Role not found');
        }

        // Create base user data
        const userData = {
            name: nameReq,
            lastName: lastNameReq,
            email: emailReq,
            password: passwordReq,
            phone: phoneReq,
            role_id: role.id
        }

        console.log("User data to be created:", userData);

        const user = new User(userData);
        console.log("New user instance created:", user);

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
        console.log("Password hashed");

        await user.save();
        console.log("User saved to the database");

        const token = await generateToken(user.id);
        console.log("Token generated:", token);

        // Destructuring specific data to user
        const { id, name, lastName, phone, email, role_id } = user;
        const dataUser = { id, name, lastName, phone, email, role_id, session_token: token };

        console.log("Data to be returned:", dataUser);

        res.status(200).json({
            success: true,
            data: dataUser,
            message: 'User created'
        });

    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
}

const validateToken = async (req = request, res = response) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token extracted:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not token provided'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        console.log("Token verified, user ID:", id);

        const user = await User.findByPk(id);
        console.log("User found:", user);

        if (!user) {
            throw new Error('User not found');
        }

        const { name, lastName, phone, email, image, role_id } = user;
        const dataUser = { id, name, lastName, phone, email, image, role_id, session_token: token };

        console.log("Data to be returned:", dataUser);

        return res.status(200).json({
            success: true,
            message: 'Token is valid',
            data: dataUser
        });
    } catch (error) {
        console.error("Error in validateToken:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired',
                expired: true,
                error
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error
        });
    }
}

module.exports = {
    login,
    register,
    validateToken
}