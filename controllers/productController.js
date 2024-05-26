const Product = require("../models/products");
const Category = require("../models/category");
const { response, request } = require("express");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;

        // Validar si se proporciona una categoría válida
        if (!category_id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'La categoría es requerida para crear el producto'
            });
        }

        // Validar si la categoría existe
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'La categoría especificada no existe'
            });
        }

        // Validar si el producto ya existe
        const existingProduct = await Product.findOne({ where: { name: name } });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'El producto ya existe'
            });
        }

        // Crear el nuevo producto
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
}


const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;

        // Validar si el producto existe
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'El producto no existe'
            });
        }

        // Validar si se proporciona una categoría válida (si se está cambiando)
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

        // Validar si el nombre del producto ya existe (si se está cambiando)
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

        // Validar que el precio sea un número entero
        if (price && (!Number.isInteger(Number(price)) || Number(price) <= 0)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'El precio debe ser un número entero'
            });
        }

        // Actualizar el producto
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
}

module.exports = {
    createProduct,
    editProduct
}