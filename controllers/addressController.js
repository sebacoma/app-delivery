const  Address  = require('../models/adresses'); // Asegúrate de importar el modelo Address correctamente
const { response, request } = require("express");

const saveAddress = async (req, res) => {
    const { name, latitude, longitude, userId } = req.body;

    try {
        let address = await Address.create({
            name,
            latitude,
            longitude,
            user_id: userId // Asignar el user_id recibido en el cuerpo de la solicitud
        });

        res.status(200).json({
            success: true,
            data: address,
            message: 'Dirección guardada exitosamente'
        });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error al guardar la dirección: ' + error.message
        });
    }
};

const getAddresses = async (req, res) => {
    const userId = req.params.userId; // Obtener el userId desde los parámetros de la URL

    try {
        const addresses = await Address.findAll({
            where: {
                user_id: userId // Filtrar por user_id
            }
        });

        res.status(200).json({
            success: true,
            data: addresses
        });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error al obtener las direcciones: ' + error.message
        });
    }
};

module.exports = {
    getAddresses,
    saveAddress
};