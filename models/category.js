const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Category extends Model {

    static id;
    static name;
    static description;
    static image;
    static status;
}

Category.init({

    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    sequelize: db,
    modelName: 'Category',
});

module.exports = Category;

