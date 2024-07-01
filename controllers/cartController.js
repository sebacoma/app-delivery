const { response, request } = require("express");
const Order = require("../models/order");
const Product = require("../models/products");

const addToCart = async (req = request, res = response) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    try {
        // Buscar el producto por su ID para obtener el precio
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Calcular el total_price multiplicando el precio por la cantidad
        const total_price = product.price * quantity;

        // Crear un nuevo pedido para el producto y usuario específicos
        const order = await Order.create({
            user_id: userId,
            total_price,
            product_id: productId,
            quantity
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({
            success: false,
            message: "Error adding product to cart"
        });
    }
};

module.exports = {
    addToCart
};