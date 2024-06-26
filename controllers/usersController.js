const { request, response } = require("express");
const bcrypt = require('bcryptjs'); // Importar bcrypt para manejar las contraseñas
const User = require("../models/user");
const address = require("../models/Adresses");

const changePassword = async (req = request, res = response) => {
    const userId = req.user.id; // Obtener el ID del usuario del token JWT
    const { oldPassword, newPassword } = req.body;

    try {
        // Buscar al usuario por ID en la base de datos
        const user = await User.findByPk(userId);

        // Verificar la contraseña antigua utilizando bcrypt
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña antigua incorrecta'
            });
        }

        // Cambiar la contraseña
        const salt = bcrypt.genSaltSync();
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Contraseña cambiada exitosamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al cambiar la contraseña'
        });
    }
};

const updateProfile = async (req = request, res = response) => {
    try {
        const { name, lastName, phone } = req.body;
        const userId = req.user.id; // Obtener el ID del usuario del token JWT

        // Buscar y actualizar el usuario
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Actualizar los campos del perfil
        user.name = name;
        user.lastName = lastName;
        user.phone = phone;
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const saveAddress = async (req = request, res = response) => {
    try {
        const { name, street, latitude, longitude, user_id } = req.body;


        // Crear una nueva dirección
        const newAddress = await address.create({
            name,
            street,
            latitude,
            longitude,
            user_id: user_id
        });

        res.status(201).json({
            success: true,
            data: newAddress.dataValues,
            message: 'Address saved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
module.exports = {
    changePassword,
    updateProfile,
    saveAddress
};