const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");
const User = require('./user'); // Importa el modelo User si no lo has importado aún

class Order extends Model {
    static id;
    static total_price;
    static state;
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
        defaultValue: true
    }

}, {
    sequelize: db,
    modelName: 'Order',
});

// Establece la relación con User
Order.belongsTo(User, { foreignKey: 'user_id' }); // Ajusta el nombre correcto de la columna en la tabla Order

module.exports = Order;