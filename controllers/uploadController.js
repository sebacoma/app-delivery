const { response, request } = require("express");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/products");
const Image = require("../models/images");
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

const uploadProductImagesCloudinary = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'No existe el producto'
            });
        }

        const images = req.files.archive;

        const uploadedImages = await Promise.all(images.map(async (image) => {
            const { tempFilePath } = image;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
                folder: `AppDelivery365/products`
            });

            // Guardar la URL de la imagen en la tabla images
            const newImage = await Image.create({ url: secure_url, product_id: product.id });

            return newImage.id; // Devolver solo el ID de la imagen creada
        }));

        // Devolver los IDs de las imágenes
        res.status(201).json({
            success: true,
            data: uploadedImages
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getImagesByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        // Buscar el producto por su ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Obtener las imágenes asociadas al producto
        const images = await Image.findAll({ where: { product_id: productId } });

        res.status(200).json({
            success: true,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error al obtener las imágenes del producto: ' + error.message
        });
    }
}

module.exports = {
    updateImageCloudinary,
    uploadProductImagesCloudinary,
    getImagesByProductId
}