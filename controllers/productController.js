const Product = require("../models/products");
const Category = require("../models/category");
const Image = require("../models/images"); // Importamos el modelo de imagen
const { response, request } = require("express");

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const category_id = req.params.category_id;

        if (!category_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'La categoría es requerida para crear el producto'
            });
        }

        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'La categoría especificada no existe'
            });
        }

        const existingProduct = await Product.findOne({ where: { name: name } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'El producto ya existe'
            });
        }

        const product = await Product.create({ name, description, price, category_id });

        return res.status(200).json({
            success: true,
            data: product,
            error: false,
            message: 'Producto creado exitosamente'
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error al crear el producto: ' + error.message
        });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'El producto no existe'
            });
        }

        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'La categoría especificada no existe'
                });
            }
        }

        if (name && name !== product.name) {
            const existingProduct = await Product.findOne({ where: { name: name } });
            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'El nombre del producto ya existe'
                });
            }
        }

        if (price && (!Number.isInteger(Number(price)) || Number(price) <= 0)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'El precio debe ser un número entero'
            });
        }

        await product.update({ name, description, price, category_id });

        return res.status(200).json({
            success: true,
            data: product,
            error: false,
            message: 'Producto actualizado exitosamente'
        });
    } catch (error) {
        console.error("Error al editar el producto:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error al editar el producto: ' + error.message
        });
    }
};

const getProductById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: [{ model: Image, as: 'images' }]
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

const getProductsByCategory = async (req, res) => {
    const { category_id } = req.params;
    try {
        const products = await Product.findAll({
            where: { category_id },
            include: [{ model: Image, as: 'images' }]
        });
        return res.status(200).json({
            success: true,
            data: products,
            error: false,
            message: products.length > 0 ? 'Productos recuperados exitosamente' : 'No hay productos disponibles en esta categoría'
        });
    } catch (error) {
        console.error("Error al recuperar los productos:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error al recuperar los productos'
        });
    }
};

const deactivateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Producto no encontrado'
            });
        }

        if (!product.status) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'El producto ya está desactivado'
            });
        }

        product.status = false;
        await product.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Producto desactivado exitosamente'
        });
    } catch (error) {
        console.error("Error al desactivar el producto:", error);
        return res.status(500).json({
            success: false,
                error: true,
            message: 'Error al desactivar el producto: ' + error.message
        });
    }
};

module.exports = {
    createProduct,
    editProduct,
    getProductsByCategory,
    getProductById,
    deactivateProduct
};
