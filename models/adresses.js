const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Address extends Model {
    static id;
    static name;
    static street;
    static latitude;
    static longitude;
    static user_id;
}

Address.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
        }
    }
}, {
    sequelize: db,
    modelName: 'Address',
    timestamps: false
});

module.exports = Address;