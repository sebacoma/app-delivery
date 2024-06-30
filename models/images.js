const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Image extends Model {}

Image.init({
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Image',
});

module.exports = Image;
