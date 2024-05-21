const { response, request } = require("express");
const User = require("../models/user");
const Category = require("../models/category");
const cloudinary = require('cloudinary').v2;


const updateImageCloudinary = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'No existe el usuario'
                    });
                }
                break;
            case 'categories':
                model = await Category.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'No existe la categoría'
                    });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'La opción no es válida'
                });
        }

        // Clean previous image
        if (model.image) {
            const nameImageArray = model.image.split('/');
            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [public_image_id] = nameImage.split('.');
            cloudinary.uploader.destroy(`AppDelivery365/${collection}/${public_image_id}`);
        }

        // Extract temporal image
        const { tempFilePath } = req.files.archive;

        // Upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `AppDelivery365/${collection}`
        });

        // Update image to model
        model.image = secure_url;
        await model.save();

        res.status(201).json({
            success: true,
            data: model.image
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    updateImageCloudinary
}