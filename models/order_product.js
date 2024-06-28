const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");
const Product = require('./products'); // Asegúrate de importar correctamente el modelo Product
const Order = require('./order'); // Asegúrate de importar correctamente el modelo Order

class Order_products extends Model {
    static id;
    static quantity;
}

Order_products.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, {
    sequelize: db,
    modelName: 'Order_products',
});

// Establecer relaciones con Product y Order
Order_products.belongsTo(Product, { foreignKey: 'product_id' });
Order_products.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = Order_products;