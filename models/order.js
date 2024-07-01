const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");
const Product = require('./products'); // Asegúrate de importar correctamente el modelo Product
const User = require('./user'); // Importa el modelo User

class Order extends Model {
    static id;
    static total_price;
    static state;
    static quantity;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total_price: {
        type: DataTypes.INTEGER, // Ajusta el tipo de dato según el almacenamiento requerido para el precio total
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Order',
});

// Establece la relación con User y Product
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;