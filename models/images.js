const { DataTypes, Model } = require("sequelize");
const db = require("../db/connection");
const Product = require("./products"); 

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

Product.hasMany(Image, { foreignKey: 'product_id' });
Image.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Image;